import { useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Eye, 
  EyeOff, 
  LockKeyhole, 
  Fingerprint,
  Cpu,
  Network,
  ShieldCheck,
  Key,
  AlertTriangle,
  User,
  Mail,
  LogIn,
  Server,
  Binary,
  Smartphone,
  Lock,
  QrCode,
  Database,
  ServerCrash,
  HardDrive,
  Cctv,
  FileLock,
  ShieldAlert,
  CheckCircle
} from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [requires2FA, setRequires2FA] = useState(false)
  const [tempToken, setTempToken] = useState("")
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setRequires2FA(false)
    
    try {
      const res = await api.post("/auth/login", { email, password })
      
      // Check if 2FA is required
      if (res.data.requires2FA) {
        // Store temporary token and email for 2FA verification
        localStorage.setItem("tempToken", res.data.tempToken || "")
        localStorage.setItem("email", email)
        setTempToken(res.data.tempToken || "")
        setRequires2FA(true)
        
        // Show 2FA required message
        setError("Vérification 2FA requise. Veuillez entrer votre code d'authentification.")
      } else {
        // Regular login success
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("email", email)
        localStorage.setItem("twoFaOk", "true")
        navigate("/dashboard", { replace: true })
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message)
      
      // Handle 2FA required error from backend
      if (err.response?.data?.message === "2FA_REQUIRED" || err.response?.data?.requires2FA) {
        setRequires2FA(true)
        localStorage.setItem("email", email)
        setError("Authentification à deux facteurs requise. Veuillez entrer votre code de vérification.")
      } else {
        setError(err.response?.data?.message || "Échec de l'authentification. Veuillez vérifier vos identifiants.")
      }
    } finally {
      setLoading(false)
    }
  }

  // Function to handle 2FA verification
  const verify2FA = async (code) => {
    setLoading(true)
    try {
      const res = await api.post("/auth/2fa/verify", { 
        code: Number(code),
        email: localStorage.getItem("email"),
        tempToken: tempToken || localStorage.getItem("tempToken")
      })
      
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("email", email)
      localStorage.setItem("twoFaOk", "true")
      localStorage.removeItem("tempToken")
      
      navigate("/dashboard", { replace: true })
    } catch (err) {
      setError("Code de vérification invalide. Veuillez réessayer.")
      console.error("2FA verification error:", err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Security Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated scan lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f620_1px,transparent_1px),linear-gradient(to_bottom,#3b82f620_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        {/* Floating particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-500/10 animate-float"
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
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"></div>
        
        {/* Security grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
                           linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Scanning line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-scan"></div>
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Security Protocol Header */}
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="relative">
                <div className="p-4 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-blue-900/10 backdrop-blur-sm">
                  <Shield className="h-8 w-8 text-blue-400" />
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
                  <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    SÉCURITEZPROTÉGÉ
                  </span>
                </h1>
                <p className="text-gray-400 font-medium text-sm font-mono tracking-wider">
                  SYSTÈME D'AUTHENTIFICATION CERTIFIÉ
                </p>
              </div>
            </div>
          </div>

          {/* Main Authentication Card */}
          <Card className="border border-blue-500/20 bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-950/90 backdrop-blur-sm shadow-2xl shadow-blue-500/10 overflow-hidden">
            {/* Card background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5"></div>
            
            <CardHeader className="space-y-3 pb-6 border-b border-blue-500/20 relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-white flex items-center gap-3">
                  {requires2FA ? (
                    <>
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-900/30 to-amber-900/10">
                        <Smartphone className="h-5 w-5 text-amber-400" />
                      </div>
                      <span className="text-amber-200">Vérification 2FA</span>
                    </>
                  ) : (
                    <>
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-blue-900/10">
                        <LockKeyhole className="h-5 w-5 text-blue-400" />
                      </div>
                      <span className="text-blue-200">Authentification Sécurisée</span>
                    </>
                  )}
                </CardTitle>
                <Badge 
                  variant="outline" 
                  className={`font-mono text-xs px-3 py-1.5 ${requires2FA 
                    ? 'border-amber-500/30 bg-gradient-to-r from-amber-900/40 to-amber-900/20 text-amber-300' 
                    : 'border-blue-500/30 bg-gradient-to-r from-blue-900/40 to-blue-900/20 text-blue-300'
                  }`}
                >
                  {requires2FA ? '2FA ACTIVÉ' : 'PROTOCOLE ACTIF'}
                </Badge>
              </div>
              <CardDescription className={`text-sm ${requires2FA ? 'text-amber-400/80' : 'text-blue-400/80'}`}>
                {requires2FA 
                  ? "Protection supplémentaire activée - Code à usage unique requis"
                  : "Identifiez-vous avec vos credentials sécurisés"}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6 relative">
              {requires2FA ? (
                /* 2FA Verification Section */
                <div className="space-y-6">
                  {/* Security Alert */}
                  <div className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-900/20 to-amber-950/20 p-5 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-900/30 to-amber-900/10 flex-shrink-0">
                        <ShieldCheck className="h-6 w-6 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-amber-300 mb-2">Protection 2FA Activée</h3>
                        <p className="text-sm text-amber-300/80 leading-relaxed">
                          Vérification requise pour confirmer votre identité. Entrez le code à 6 chiffres généré par votre application d'authentification.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2FA Code Input */}
                  <div className="space-y-4">
                    <Label htmlFor="code" className="text-gray-300 font-semibold text-sm flex items-center gap-2">
                      <Fingerprint className="h-4 w-4 text-amber-400" />
                      Code d'authentification à 6 chiffres
                    </Label>
                    <div className="relative">
                      <Input
                        id="code"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        placeholder="000000"
                        className="text-center text-3xl tracking-widest font-mono h-16 bg-gray-900/50 border-amber-500/30 text-white placeholder:text-gray-600 focus:border-amber-500 focus:ring-amber-500/30"
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length === 6) {
                            verify2FA(value);
                          }
                        }}
                      />
                      <div className="absolute inset-0 rounded-lg border-2 border-transparent pointer-events-none bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                        Valide 30 secondes
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Smartphone className="h-3.5 w-3.5" />
                        Application authentificator
                      </span>
                    </div>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="rounded-xl border border-red-500/30 bg-gradient-to-r from-red-900/20 to-red-950/20 p-4">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-red-300 text-sm">Erreur de vérification</p>
                          <p className="text-sm text-red-300/80 mt-1">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => navigate("/2fa")}
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold border-0 shadow-lg shadow-amber-500/20"
                    >
                      <QrCode className="mr-2.5 h-4.5 w-4.5" />
                      Configuration 2FA
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setRequires2FA(false)}
                      className="w-full border-gray-700/50 text-gray-400 hover:bg-gray-800/50 hover:text-gray-300 font-semibold"
                    >
                      ← Retour à l'authentification
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-6">
                  {/* Authentication Error */}
                  {error && !error.includes("2FA") && (
                    <div className="rounded-xl border border-red-500/30 bg-gradient-to-r from-red-900/20 to-red-950/20 p-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-lg border border-red-500/30 bg-red-900/20">
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-red-300">Sécurité compromise</p>
                          <p className="text-sm text-red-300/80 mt-1">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Email Field */}
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-gray-300 font-semibold text-sm flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-400" />
                      Identifiant / Email
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="utilisateur@securitez.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                        className="pl-11 bg-gray-900/50 border-blue-500/20 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/30 h-12"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Mail className="h-4 w-4 text-blue-400" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Password Field */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-gray-300 font-semibold text-sm flex items-center gap-2">
                        <Lock className="h-4 w-4 text-blue-400" />
                        Mot de passe
                      </Label>
                      <Button
                        variant="link"
                        className="text-blue-400 hover:text-blue-300 p-0 h-auto text-xs font-normal"
                        onClick={() => {/* Add forgot password logic */}}
                      >
                        Assistance support
                      </Button>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={show ? "text" : "password"}
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                        className="pl-11 pr-11 bg-gray-900/50 border-blue-500/20 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/30 h-12"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Key className="h-4 w-4 text-blue-400" />
                      </div>
                      <button
                        type="button"
                        onClick={() => setShow((s) => !s)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-800/50 transition-colors"
                        aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      >
                        {show ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Security Status */}
                  <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-gray-900/50 to-gray-950/50 p-4">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-gray-300 font-medium">Système actif</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Shield className="h-3.5 w-3.5 text-blue-400" />
                        <span className="text-gray-300 font-medium">AES-256</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Fingerprint className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-gray-300 font-medium">2FA Support</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Server className="h-3.5 w-3.5 text-purple-400" />
                        <span className="text-gray-300 font-medium">Surveillance</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Login Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg shadow-blue-500/20 border-0 h-12"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="mr-2.5 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        VÉRIFICATION EN COURS...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2.5 h-5 w-5" />
                        ACCÈS SÉCURISÉ
                      </>
                    )}
                  </Button>
                  
                  {/* Register Link */}
                  <div className="text-center pt-4 border-t border-gray-800/50">
                    <p className="text-gray-500 text-sm">
                      Nouveau système ?{" "}
                      <Button
                        variant="link"
                        className="text-blue-400 hover:text-blue-300 p-0 h-auto font-medium text-sm"
                        onClick={() => navigate("/register")}
                      >
                        Créer un compte sécurisé
                      </Button>
                    </p>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Security Footer */}
          <div className="mt-10">
            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Badge variant="outline" className="border-green-500/20 bg-gradient-to-r from-green-900/30 to-green-900/10 text-green-300 font-mono text-xs px-3 py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse mr-1.5"></div>
                  SÉCURITÉ: {requires2FA ? '2FA ACTIVE' : 'STANDARD'}
                </Badge>
                <Badge variant="outline" className="border-blue-500/20 bg-gradient-to-r from-blue-900/30 to-blue-900/10 text-blue-300 font-mono text-xs px-3 py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-1.5"></div>
                  PROTOCOLE: TLS 1.3
                </Badge>
                <Badge variant="outline" className="border-emerald-500/20 bg-gradient-to-r from-emerald-900/30 to-emerald-900/10 text-emerald-300 font-mono text-xs px-3 py-1.5">
                  <Cpu className="h-3 w-3 mr-1.5" />
                  CHIFFRÉ: AES-256
                </Badge>
              </div>
              <div className="text-xs text-gray-500 text-center max-w-md font-mono tracking-wide">
                SYSTÈME CERTIFIÉ ISO 27001 • CHIFFREMENT DE BOUT EN BOUT • JOURNALISATION COMPLÈTE • CONFORMITÉ RGPD
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="flex gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
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
  )
}