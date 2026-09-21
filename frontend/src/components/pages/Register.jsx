import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  UserPlus,
  Mail,
  Lock,
  Key,
  CheckCircle2,
  AlertCircle,
  Server,
  Database,
  ShieldCheck,
  Fingerprint,
  Cpu,
  FileLock,
  Eye,
  EyeOff,
  Zap,
  BarChart3,
  HardDrive,
  Globe
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setForm({ ...form, password: newPassword });
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    if (passwordStrength < 3) {
      setError("Le mot de passe n'est pas assez sécurisé. Utilisez au moins 8 caractères avec majuscules, minuscules et chiffres.");
      setLoading(false);
      return;
    }

    try {
      await api.post("/auth/register", {
        email: form.email,
        password: form.password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la création du compte. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0: case 1: return "bg-red-500";
      case 2: return "bg-amber-500";
      case 3: return "bg-yellow-500";
      case 4: return "bg-emerald-500";
      case 5: return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0: return "TRÈS FAIBLE";
      case 1: return "FAIBLE";
      case 2: return "MOYEN";
      case 3: return "BON";
      case 4: return "FORT";
      case 5: return "EXCELLENT";
      default: return "";
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Security Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        {/* Floating particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-emerald-500/10 animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
                width: `${40 + i * 10}px`,
                height: `${40 + i * 10}px`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
        
        {/* Security grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px),
                           linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Scanning line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent animate-scan"></div>
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Security Protocol Header */}
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="relative">
                <div className="p-4 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 backdrop-blur-sm">
                  <ShieldCheck className="h-8 w-8 text-emerald-400" />
                </div>
                <div className="absolute -right-2 -top-2">
                  <div className="relative">
                    <div className="h-5 w-5 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="absolute inset-0 h-5 w-5 rounded-full bg-green-500/50 animate-ping"></div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                  <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                    SÉCURITEZPROTÉGÉ
                  </span>
                </h1>
                <p className="text-gray-400 font-medium text-sm font-mono tracking-wider">
                  CRÉATION DE COMPTE SÉCURISÉ
                </p>
              </div>
            </div>
          </div>

          {/* Main Registration Card */}
          <Card className="border border-emerald-500/20 bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-950/90 backdrop-blur-sm shadow-2xl shadow-emerald-500/10 overflow-hidden">
            {/* Card background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5"></div>
            
            <CardHeader className="space-y-3 pb-6 border-b border-emerald-500/20 relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/30 to-emerald-900/10">
                    <UserPlus className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-emerald-200">Nouveau Compte Sécurisé</span>
                </CardTitle>
                <Badge 
                  variant="outline" 
                  className="font-mono text-xs px-3 py-1.5 border-emerald-500/30 bg-gradient-to-r from-emerald-900/40 to-emerald-900/20 text-emerald-300"
                >
                  CRÉATION
                </Badge>
              </div>
              <CardDescription className="text-emerald-400/80 text-sm">
                Créez votre compte avec les standards de sécurité les plus élevés
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6 relative">
              <form onSubmit={submit} className="space-y-6">
                {/* Error Display */}
                {error && (
                  <div className="rounded-xl border border-red-500/30 bg-gradient-to-r from-red-900/20 to-red-950/20 p-5">
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-xl border border-red-500/30 bg-red-900/20 flex-shrink-0">
                        <AlertCircle className="h-6 w-6 text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-red-300 mb-2">Erreur de sécurité</h3>
                        <p className="text-sm text-red-300/80 leading-relaxed">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-gray-300 font-semibold text-sm flex items-center gap-2">
                    <Mail className="h-4 w-4 text-emerald-400" />
                    Adresse Email Sécurisée
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="nom@entreprise.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      autoComplete="email"
                      required
                      className="pl-11 bg-gray-900/50 border-emerald-500/20 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/30 h-12"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Mail className="h-4 w-4 text-emerald-400" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Utilisez une adresse email professionnelle pour une sécurité optimale
                  </p>
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-gray-300 font-semibold text-sm flex items-center gap-2">
                    <Key className="h-4 w-4 text-emerald-400" />
                    Mot de passe Sécurisé
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={form.password}
                      onChange={handlePasswordChange}
                      autoComplete="new-password"
                      required
                      className="pl-11 pr-11 bg-gray-900/50 border-emerald-500/20 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/30 h-12"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Lock className="h-4 w-4 text-emerald-400" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-800/50 transition-colors"
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {form.password && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">Force du mot de passe:</span>
                        <Badge className={`font-mono text-xs px-3 py-1 ${getStrengthColor().replace('bg-', 'bg-').replace('bg-', 'bg-')} text-white`}>
                          {getStrengthText()}
                        </Badge>
                      </div>
                      <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getStrengthColor()} transition-all duration-300 rounded-full`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className={`flex items-center gap-2 ${form.password.length >= 8 ? 'text-emerald-400' : 'text-gray-500'}`}>
                          {form.password.length >= 8 ? 
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : 
                            <div className="h-3.5 w-3.5 rounded-full border border-gray-600"></div>
                          }
                          <span>8+ caractères</span>
                        </div>
                        <div className={`flex items-center gap-2 ${/[A-Z]/.test(form.password) ? 'text-emerald-400' : 'text-gray-500'}`}>
                          {/[A-Z]/.test(form.password) ? 
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : 
                            <div className="h-3.5 w-3.5 rounded-full border border-gray-600"></div>
                          }
                          <span>Majuscule</span>
                        </div>
                        <div className={`flex items-center gap-2 ${/[0-9]/.test(form.password) ? 'text-emerald-400' : 'text-gray-500'}`}>
                          {/[0-9]/.test(form.password) ? 
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : 
                            <div className="h-3.5 w-3.5 rounded-full border border-gray-600"></div>
                          }
                          <span>Chiffre</span>
                        </div>
                        <div className={`flex items-center gap-2 ${/[^A-Za-z0-9]/.test(form.password) ? 'text-emerald-400' : 'text-gray-500'}`}>
                          {/[^A-Za-z0-9]/.test(form.password) ? 
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : 
                            <div className="h-3.5 w-3.5 rounded-full border border-gray-600"></div>
                          }
                          <span>Caractère spécial</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-gray-300 font-semibold text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4 text-emerald-400" />
                    Confirmation du mot de passe
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      autoComplete="new-password"
                      required
                      className="pl-11 pr-11 bg-gray-900/50 border-emerald-500/20 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/30 h-12"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <FileLock className="h-4 w-4 text-emerald-400" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-800/50 transition-colors"
                      aria-label={showConfirmPassword ? "Masquer la confirmation" : "Afficher la confirmation"}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                    </button>
                  </div>
                  {form.confirmPassword && form.password !== form.confirmPassword && (
                    <div className="flex items-center gap-2 text-xs text-red-400">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>Les mots de passe ne correspondent pas</span>
                    </div>
                  )}
                </div>

                {/* Security Features */}
                <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-gray-900/50 to-gray-950/50 p-5">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm font-semibold text-emerald-300">
                      <ShieldCheck className="h-5 w-5 text-emerald-400" />
                      Protection activée sur votre compte
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-gray-300 font-medium">Chiffrement AES-256</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-gray-300 font-medium">Journalisation</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-gray-300 font-medium">2FA Optionnel</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-gray-300 font-medium">Surveillance</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-lg shadow-emerald-500/20 border-0 h-12"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="mr-2.5 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      CRÉATION EN COURS...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2.5 h-5 w-5" />
                      CRÉER LE COMPTE SÉCURISÉ
                    </>
                  )}
                </Button>

                {/* Login Link */}
                <div className="text-center pt-4 border-t border-gray-800/50">
                  <p className="text-gray-500 text-sm">
                    Déjà un compte ?{" "}
                    <Button
                      variant="link"
                      className="text-emerald-400 hover:text-emerald-300 p-0 h-auto font-medium text-sm"
                      onClick={() => navigate("/login")}
                    >
                      Se connecter
                    </Button>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Security Footer */}
          <div className="mt-10">
            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Badge variant="outline" className="border-emerald-500/20 bg-gradient-to-r from-emerald-900/30 to-emerald-900/10 text-emerald-300 font-mono text-xs px-3 py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5"></div>
                  NOUVEAU COMPTE
                </Badge>
                <Badge variant="outline" className="border-blue-500/20 bg-gradient-to-r from-blue-900/30 to-blue-900/10 text-blue-300 font-mono text-xs px-3 py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-1.5"></div>
                  PROTOCOLE: TLS 1.3
                </Badge>
                <Badge variant="outline" className="border-amber-500/20 bg-gradient-to-r from-amber-900/30 to-amber-900/10 text-amber-300 font-mono text-xs px-3 py-1.5">
                  <HardDrive className="h-3 w-3 mr-1.5" />
                  CHIFFRÉ: AES-256
                </Badge>
              </div>
              <div className="text-xs text-gray-500 text-center max-w-md font-mono tracking-wide">
                DONNÉES CHIFFRÉES DE BOUT EN BOUT • CONFORMITÉ RGPD • AUDIT SÉCURITÉ MENSUEL
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="flex gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <span>SÉCURITEZPROTÉGÉ v2.4 • © {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}