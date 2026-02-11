"use client";

import { useState } from "react";
import { Loader2, MapPin, ArrowLeft } from "lucide-react";

export interface CustomerData {
  name: string;
  email: string;
  cpf: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
}

interface CheckoutFormProps {
  onSubmit: (data: CustomerData) => void;
  onBack: () => void;
  isLoading: boolean;
}

export default function CheckoutForm({ onSubmit, onBack, isLoading }: CheckoutFormProps) {
  const [form, setForm] = useState<CustomerData>({
    name: "",
    email: "",
    cpf: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    city: "",
    state: "",
  });

  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CustomerData, string>>>({});

  function updateField(field: keyof CustomerData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleCpfChange(value: string) {
    let masked = value.replace(/\D/g, "");
    if (masked.length > 11) masked = masked.slice(0, 11);
    if (masked.length > 9) {
      masked = masked.slice(0, 3) + "." + masked.slice(3, 6) + "." + masked.slice(6, 9) + "-" + masked.slice(9);
    } else if (masked.length > 6) {
      masked = masked.slice(0, 3) + "." + masked.slice(3, 6) + "." + masked.slice(6);
    } else if (masked.length > 3) {
      masked = masked.slice(0, 3) + "." + masked.slice(3);
    }
    updateField("cpf", masked);
  }

  function validateCpf(cpf: string): boolean {
    const digits = cpf.replace(/\D/g, "");
    if (digits.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(digits)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
    let rest = (sum * 10) % 11;
    if (rest === 10) rest = 0;
    if (rest !== parseInt(digits[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
    rest = (sum * 10) % 11;
    if (rest === 10) rest = 0;
    if (rest !== parseInt(digits[10])) return false;

    return true;
  }

  async function handleCepBlur() {
    const cleanCep = form.cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) return;

    setCepLoading(true);
    setCepError(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setCepError("CEP não encontrado");
        return;
      }

      setForm((prev) => ({
        ...prev,
        street: data.logradouro || prev.street,
        city: data.localidade || prev.city,
        state: data.uf || prev.state,
      }));
    } catch {
      setCepError("Erro ao buscar CEP");
    } finally {
      setCepLoading(false);
    }
  }

  function handleCepChange(value: string) {
    let masked = value.replace(/\D/g, "");
    if (masked.length > 8) masked = masked.slice(0, 8);
    if (masked.length > 5) {
      masked = masked.slice(0, 5) + "-" + masked.slice(5);
    }
    updateField("cep", masked);
  }

  function validate(): boolean {
    const errors: Partial<Record<keyof CustomerData, string>> = {};

    if (!form.name.trim()) errors.name = "Nome é obrigatório";
    else if (form.name.trim().split(" ").filter(Boolean).length < 2)
      errors.name = "Informe nome e sobrenome";
    if (!form.email.trim()) errors.email = "Email é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Email inválido";
    if (!form.cpf.trim()) errors.cpf = "CPF é obrigatório";
    else if (!validateCpf(form.cpf)) errors.cpf = "CPF inválido";
    if (form.cep.replace(/\D/g, "").length !== 8) errors.cep = "CEP inválido";
    if (!form.number.trim()) errors.number = "Número é obrigatório";
    if (!form.city.trim()) errors.city = "Cidade é obrigatória";
    if (!form.state.trim()) errors.state = "Estado é obrigatório";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  }

  const inputClass =
    "w-full bg-green/10 border border-green/30 rounded-lg px-3 py-2.5 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-tan/60 transition-colors";
  const labelClass = "text-cream/60 text-xs font-medium mb-1 block";
  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-green/30">
        <button
          type="button"
          onClick={onBack}
          className="text-cream/60 hover:text-cream transition-colors p-1"
          aria-label="Voltar ao carrinho"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <MapPin size={20} className="text-tan" />
          <h2 className="text-lg font-bold text-cream">Dados de Entrega</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Nome */}
        <div>
          <label className={labelClass}>Nome completo *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Seu nome completo"
            className={inputClass}
          />
          {formErrors.name && <p className={errorClass}>{formErrors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="seu@email.com"
            className={inputClass}
          />
          {formErrors.email && <p className={errorClass}>{formErrors.email}</p>}
        </div>

        {/* CPF */}
        <div>
          <label className={labelClass}>CPF *</label>
          <input
            type="text"
            value={form.cpf}
            onChange={(e) => handleCpfChange(e.target.value)}
            placeholder="000.000.000-00"
            className={inputClass}
            maxLength={14}
          />
          {formErrors.cpf && <p className={errorClass}>{formErrors.cpf}</p>}
        </div>

        {/* CEP */}
        <div>
          <label className={labelClass}>CEP *</label>
          <div className="relative">
            <input
              type="text"
              value={form.cep}
              onChange={(e) => handleCepChange(e.target.value)}
              onBlur={handleCepBlur}
              placeholder="00000-000"
              className={inputClass}
              maxLength={9}
            />
            {cepLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 size={16} className="animate-spin text-tan" />
              </div>
            )}
          </div>
          {cepError && <p className={errorClass}>{cepError}</p>}
          {formErrors.cep && <p className={errorClass}>{formErrors.cep}</p>}
        </div>

        {/* Rua (auto-filled) */}
        <div>
          <label className={labelClass}>Rua</label>
          <input
            type="text"
            value={form.street}
            onChange={(e) => updateField("street", e.target.value)}
            placeholder="Preenchido automaticamente pelo CEP"
            className={inputClass}
          />
        </div>

        {/* Número + Complemento */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Número *</label>
            <input
              type="text"
              value={form.number}
              onChange={(e) => updateField("number", e.target.value)}
              placeholder="123"
              className={inputClass}
            />
            {formErrors.number && (
              <p className={errorClass}>{formErrors.number}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Complemento</label>
            <input
              type="text"
              value={form.complement}
              onChange={(e) => updateField("complement", e.target.value)}
              placeholder="Apto, bloco..."
              className={inputClass}
            />
          </div>
        </div>

        {/* Cidade + Estado (read-only, filled by CEP) */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className={labelClass}>Cidade *</label>
            <input
              type="text"
              value={form.city}
              readOnly
              placeholder="Preenchido pelo CEP"
              className={`${inputClass} cursor-not-allowed opacity-70`}
            />
            {formErrors.city && (
              <p className={errorClass}>{formErrors.city}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Estado *</label>
            <input
              type="text"
              value={form.state}
              readOnly
              placeholder="UF"
              maxLength={2}
              className={`${inputClass} uppercase cursor-not-allowed opacity-70`}
            />
            {formErrors.state && (
              <p className={errorClass}>{formErrors.state}</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="p-6 border-t border-green/30">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brown hover:bg-brown/80 disabled:opacity-60 disabled:cursor-not-allowed text-dark-green font-bold py-4 rounded-full text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brown/20 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Processando...
            </>
          ) : (
            "Continuar para Pagamento"
          )}
        </button>
      </div>
    </form>
  );
}
