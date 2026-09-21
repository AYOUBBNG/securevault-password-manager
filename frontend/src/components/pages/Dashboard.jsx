import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldPlus,
  ShieldOff,
  RefreshCcw,
  LogOut,
  QrCode,
  KeyRound,
  Trash2,
  Eye,
  EyeOff,
  AlertTriangle,
  LockKeyhole,
  Lock,
  Unlock,
  Cpu,
  Fingerprint,
  Database,
  Key,
  Hash,
  Network,
  Server,
  Binary,
  Scan,
  Zap,
  Globe,
  Cctv,
  CheckCircle,
  XCircle,
  User,
  Mail,
  HardDrive,
  FileLock,
  BarChart3,
  Smartphone,
  Copy,
  X,
  ExternalLink,
  Clock,
} from "lucide-react";

// Composant Modal pour afficher le mot de passe
function PasswordRevealModal({ isOpen, onClose, service, password }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-950 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-700/50 bg-emerald-900/30">
              <Eye className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Mot de Passe Déchiffré
              </h3>
              <p className="text-sm text-gray-400">{service}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-800 hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <Label className="text-sm text-gray-300">
              Votre mot de passe :
            </Label>
            <Badge className="bg-gray-800 text-xs text-gray-300">
              {password.length} caractères
            </Badge>
          </div>
          <div className="relative">
            <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-4">
              <div className="font-mono text-lg tracking-widest text-white">
                {password}
              </div>
            </div>
            <button
              onClick={copyToClipboard}
              className="absolute right-3 top-3 rounded-lg bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              {copied ? (
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>
          {copied && (
            <p className="mt-2 text-center text-sm text-emerald-400">
              ✓ Copié dans le presse-papier
            </p>
          )}
        </div>

        <div className="rounded-lg border border-amber-700/30 bg-amber-900/20 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-300">Sécurité</p>
              <p className="text-xs text-amber-300/80">
                Ce mot de passe est maintenant visible. Assurez-vous de le
                copier dans un endroit sécurisé.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            onClick={copyToClipboard}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            {copied ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Copié !
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copier
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Fermer
          </Button>
        </div>
      </div>
    </div>
  );
}

// Composant Popup de Confirmation
function ConfirmationPopup({ isOpen, onClose, title, description, onConfirm, confirmText = "Confirmer", cancelText = "Annuler", variant = "default" }) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-blue-500/20 bg-gradient-to-br from-gray-900 to-gray-950 p-6 shadow-2xl shadow-blue-500/10">
        {/* Effet de lumière */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5"></div>
        
        <div className="relative mb-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-blue-500/30 bg-blue-900/20">
              <AlertTriangle className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
              <p className="mt-1 text-sm text-gray-300">{description}</p>
            </div>
          </div>
        </div>
        
        <div className="relative flex gap-3">
          <Button
            variant={variant}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 shadow-lg shadow-blue-500/20"
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-gray-700/50 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
            onClick={onClose}
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Composant Popup spécifique pour Chiffrer et Stocker
function EncryptPopup({ isOpen, onClose, form, onConfirm }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-sm rounded-xl border border-blue-700/30 bg-gray-900 p-5 shadow-2xl">
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg border border-blue-700/30 bg-blue-900/20">
              <FileLock className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Chiffrer et stocker</h3>
              <p className="text-sm text-gray-400">Confirmer l'ajout sécurisé</p>
            </div>
          </div>
          
          <div className="space-y-3 bg-gray-800/30 rounded-lg p-3">
            <div>
              <p className="text-xs text-gray-500">Service</p>
              <p className="text-sm text-white font-medium">{form.serviceName || "Non spécifié"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Identifiant</p>
              <p className="text-sm text-white font-medium">{form.username || "Non spécifié"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Mot de passe</p>
              <p className="text-sm text-gray-300">••••••••••••</p>
            </div>
          </div>
          
          <p className="mt-3 text-sm text-gray-400">
            Votre mot de passe sera chiffré avec AES-256 et stocké de manière sécurisée dans notre coffre-fort. Confirmez-vous cet ajout ?
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="default"
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            onClick={handleSubmit}
            disabled={!form.serviceName || !form.username || !form.encryptedPassword}
          >
            <FileLock className="mr-2 h-4 w-4" />
            Chiffrer et stocker
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={onClose}
          >
            Annuler
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    serviceName: "",
    username: "",
    encryptedPassword: "",
  });
  const [revealId, setRevealId] = useState(null);
  const [account2FAEnabled, setAccount2FAEnabled] = useState(false);
  const [account2FAConfigured, setAccount2FAConfigured] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [revealedPassword, setRevealedPassword] = useState("");
  const [revealedService, setRevealedService] = useState("");
  const [twoFAPage, setTwoFAPage] = useState(null);
  const [twoFAModalOpen, setTwoFAModalOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  // États pour les popups
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [encryptPopupOpen, setEncryptPopupOpen] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState(null);

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    await Promise.allSettled([fetchPasswords(), fetchStats()]);
    setLoading(false);
  };

  const handleAuthError = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("twoFaOk");
    navigate("/login", { replace: true });
  };

  const fetchPasswords = async () => {
    try {
      const res = await api.get("/vault/my");
      setPasswords(res.data);
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        handleAuthError();
      } else {
        console.error("Fetch vault error:", err.response?.data || err.message);
      }
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get("/vault/dashboard");
      setStats(res.data);

      setAccount2FAEnabled(res.data.twoFactorEnabled || false);

      if (res.data.twoFactorEnabled) {
        setAccount2FAConfigured(true);
      } else {
        try {
          const userEmail = localStorage.getItem("email");
          if (userEmail) {
            const statusRes = await api.get("/auth/2fa/status", {
              headers: { "X-User-Email": userEmail },
            });
            setAccount2FAConfigured(statusRes.data.configured || false);
          }
        } catch {
          setAccount2FAConfigured(false);
        }
      }
    } catch (err) {
      console.error("Stats error:", err.response?.data || err.message);
      setAccount2FAEnabled(false);
      setAccount2FAConfigured(false);
    }
  };

  const fetch2FAStatus = async () => {
    try {
      const userEmail = localStorage.getItem("email");
      if (!userEmail) return;

      const res = await api.get("/auth/2fa/status", {
        headers: { "X-User-Email": userEmail },
      });
      setAccount2FAEnabled(res.data.enabled || false);
      setAccount2FAConfigured(res.data.configured || false);
    } catch (err) {
      console.error("2FA status error:", err.response?.data || err.message);
      try {
        const dashboardRes = await api.get("/vault/dashboard");
        setAccount2FAEnabled(dashboardRes.data.twoFactorEnabled || false);
        setAccount2FAConfigured(dashboardRes.data.twoFactorEnabled || false);
      } catch {
        setAccount2FAEnabled(false);
        setAccount2FAConfigured(false);
      }
    }
  };

  const addPassword = async (e) => {
    if (e) e.preventDefault();

    try {
      const res = await api.post("/vault", form);
      setPasswords((prev) => [res.data, ...prev]);
      fetchStats();
      setForm({ serviceName: "", username: "", encryptedPassword: "" });
      setSuccessMessage("Mot de passe ajouté et chiffré avec succès !");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Add error:", err.response?.status, err.response?.data);
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        handleAuthError();
      } else {
        alert("Erreur lors de l'ajout. Veuillez vérifier les données.");
      }
    }
  };

  const deletePassword = async (id) => {
    try {
      await api.delete(`/vault/${id}`);
      setPasswords((prev) => prev.filter((p) => p.id !== id));
      fetchStats();
      setSuccessMessage("Identifiant supprimé avec succès !");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("Erreur lors de la suppression.");
    }
  };

  const revealPassword = async (id) => {
    try {
      setRevealId(id);
      const res = await api.get(`/vault/${id}/reveal`);
      const service =
        passwords.find((p) => p.id === id)?.serviceName || "Service inconnu";

      setRevealedPassword(res.data);
      setRevealedService(service);
      setModalOpen(true);
    } catch (err) {
      const status = err.response?.status;
      if (status === 403) {
        setTwoFAPage("verify");
        setTwoFAModalOpen(true);
        return;
      }

      console.error("Reveal error:", err.response?.data || err.message);
      alert("Impossible de révéler le mot de passe.");
    } finally {
      setRevealId(null);
    }
  };

  const enable2FA = async () => {
    try {
      const userEmail = localStorage.getItem("email");
      if (!userEmail) {
        handleAuthError();
        return;
      }

      const res = await api.post(
        "/auth/2fa/enable",
        {},
        {
          headers: { "X-User-Email": userEmail },
        }
      );

      setQrCodeUrl(res.data.qrCodeUrl);
      setTwoFAPage("setup");
      setTwoFAModalOpen(true);
    } catch (err) {
      console.error("Enable 2FA error:", err.response?.data || err.message);
      alert("Erreur lors de l'activation du 2FA.");
    }
  };

  const verify2FACode = async (code) => {
    try {
      const userEmail = localStorage.getItem("email");
      if (!userEmail) {
        handleAuthError();
        return false;
      }

      const res = await api.post(
        "/auth/2fa/verify",
        { code },
        {
          headers: { "X-User-Email": userEmail },
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("twoFaOk", "true");

      await fetch2FAStatus();

      setSuccessMessage(
        "2FA activé avec succès ! Votre compte est maintenant sécurisé."
      );
      setTimeout(() => setSuccessMessage(""), 5000);

      return true;
    } catch (err) {
      console.error("Verify 2FA error:", err.response?.data || err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("twoFaOk");
    navigate("/login", { replace: true });
  };

  const currentSession2FAVerified = localStorage.getItem("twoFaOk") === "true";

  const kpis = useMemo(() => {
    const total = stats?.totalPasswords ?? 0;
    const weak = stats?.weakPasswords ?? 0;
    const reused = stats?.reusedPasswords ?? 0;
    const twoFactorEnabled = stats?.twoFactorEnabled ?? false;
    return { total, weak, reused, twoFactorEnabled };
  }, [stats]);

  const securityScore = useMemo(() => {
    let score = 100;
    if (kpis.weak > 0) score -= 30;
    if (kpis.reused > 0) score -= 20;
    if (!account2FAEnabled) score -= 25;
    if (!currentSession2FAVerified) score -= 25;
    return Math.max(0, score);
  }, [kpis, account2FAEnabled, currentSession2FAVerified]);

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-red-400";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  const get2FAStatus = () => {
    if (account2FAEnabled && currentSession2FAVerified) {
      return {
        status: "COMPLÈTE",
        description: "Authentification à deux facteurs active",
        badge: "bg-emerald-900/30 text-emerald-300",
        icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
        buttonColor:
          "border-emerald-700/50 bg-emerald-900/30 text-emerald-300 hover:bg-emerald-800/40",
        cardColor: "border-emerald-700/30",
        vaultAccess: "Complet",
        buttonText: "GÉRER 2FA",
        action: "manage",
      };
    } else if (account2FAEnabled && !currentSession2FAVerified) {
      return {
        status: "EN ATTENTE DE VÉRIFICATION",
        description: "2FA activé, vérifiez votre session",
        badge: "bg-amber-900/30 text-amber-300",
        icon: <Smartphone className="h-5 w-5 text-amber-400" />,
        buttonColor:
          "border-amber-700/50 bg-amber-900/30 text-amber-300 hover:bg-amber-800/40",
        cardColor: "border-amber-700/30",
        vaultAccess: "Limité",
        buttonText: "VÉRIFIER SESSION",
        action: "verify",
      };
    } else if (account2FAConfigured && !account2FAEnabled) {
      return {
        status: "CONFIGURÉ",
        description: "2FA configuré mais non activé",
        badge: "bg-amber-900/30 text-amber-300",
        icon: <Smartphone className="h-5 w-5 text-amber-400" />,
        buttonColor:
          "border-amber-700/50 bg-amber-900/30 text-amber-300 hover:bg-amber-800/40",
        cardColor: "border-amber-700/30",
        vaultAccess: "Limité",
        buttonText: "ACTIVER 2FA",
        action: "activate",
      };
    } else {
      return {
        status: "INACTIF",
        description: "2FA non configuré sur votre compte",
        badge: "bg-red-900/30 text-red-300",
        icon: <ShieldOff className="h-5 w-5 text-red-400" />,
        buttonColor:
          "border-red-700/50 bg-red-900/30 text-red-300 hover:bg-red-800/40",
        cardColor: "border-red-700/30",
        vaultAccess: "Limité",
        buttonText: "ACTIVER 2FA",
        action: "enable",
      };
    }
  };

  const sessionStatus = get2FAStatus();

  const handle2FAAction = () => {
    if (sessionStatus.action === "enable") {
      enable2FA();
    } else if (sessionStatus.action === "activate") {
      setTwoFAPage("activate");
      setTwoFAModalOpen(true);
    } else if (sessionStatus.action === "verify") {
      setTwoFAPage("verify");
      setTwoFAModalOpen(true);
    } else {
      setTwoFAPage("manage");
      setTwoFAModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-gray-950">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
              <Shield className="absolute inset-0 m-auto h-3 w-3 text-blue-400" />
            </div>
            <div>
              <div className="font-mono text-sm font-semibold text-blue-300">
                CHARGEMENT DU COFFRE-FORT...
              </div>
              <div className="mt-1 h-1 w-48 overflow-hidden rounded-full bg-gray-800">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-blue-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userEmail = localStorage.getItem("email") || "utilisateur";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-gray-950">
      {/* Success Message Popup */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-10">
          <div className="rounded-xl border border-emerald-700/50 bg-gradient-to-br from-emerald-900/90 to-emerald-950/90 p-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-emerald-700/30 bg-emerald-900/30">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-emerald-200">Succès !</h4>
                <p className="text-sm text-emerald-300/80">{successMessage}</p>
              </div>
              <button
                onClick={() => setSuccessMessage("")}
                className="ml-4 text-emerald-400 hover:text-emerald-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour afficher le mot de passe */}
      <PasswordRevealModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        service={revealedService}
        password={revealedPassword}
      />

      {/* Modal 2FA */}
      {twoFAModalOpen && (
        <TwoFAModal
          page={twoFAPage}
          qrCodeUrl={qrCodeUrl}
          onClose={() => {
            setTwoFAModalOpen(false);
            setTwoFAPage(null);
            setQrCodeUrl("");
          }}
          onVerify={verify2FACode}
          onEnable={enable2FA}
        />
      )}

      {/* Popup FERMER SESSION */}
      <ConfirmationPopup
        isOpen={logoutPopupOpen}
        onClose={() => setLogoutPopupOpen(false)}
        title="Fermer la session"
        description="Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à vos données."
        onConfirm={logout}
        confirmText="Fermer la session"
        variant="destructive"
      />

      {/* Popup VOIR */}
      <ConfirmationPopup
        isOpen={viewPopupOpen}
        onClose={() => setViewPopupOpen(false)}
        title={`Afficher le mot de passe pour "${selectedPassword?.serviceName}"`}
        description="Cette action nécessitera une vérification 2FA pour des raisons de sécurité. Souhaitez-vous continuer ?"
        onConfirm={() => {
          if (selectedPassword) {
            revealPassword(selectedPassword.id);
          }
        }}
        confirmText="Afficher"
        variant="default"
      />

      {/* Popup SUPPRIMER */}
      <ConfirmationPopup
        isOpen={deletePopupOpen}
        onClose={() => setDeletePopupOpen(false)}
        title={`Supprimer "${selectedPassword?.serviceName}"`}
        description="Êtes-vous sûr de vouloir supprimer de manière permanente cet identifiant ? Cette action est irréversible."
        onConfirm={() => {
          if (selectedPassword) {
            deletePassword(selectedPassword.id);
          }
        }}
        confirmText="Supprimer"
        variant="destructive"
      />

      {/* Popup CHIFFRER ET STOCKER */}
      <EncryptPopup
        isOpen={encryptPopupOpen}
        onClose={() => setEncryptPopupOpen(false)}
        form={form}
        onConfirm={() => addPassword()}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-8">
        {/* Main Header */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/95 to-gray-950/95 p-6 shadow-2xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="grid h-16 w-16 place-items-center rounded-2xl border border-blue-700/50 bg-gradient-to-br from-gray-800 to-gray-900">
                  <FileLock className="h-8 w-8 text-blue-400" />
                </div>
                <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-green-500 ring-2 ring-green-500/50"></div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-white tracking-tight">
                    SÉCURITEZ<span className="text-blue-400">PROTÉGÉ</span>
                  </h1>
                  <Badge className="border border-green-700/50 bg-gradient-to-r from-green-900/40 to-emerald-900/40 font-mono text-xs text-green-300">
                    <Zap className="mr-1 h-3 w-3" />
                    ACTIF
                  </Badge>
                </div>
                <p className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                  <User className="h-3.5 w-3.5" />
                  <span className="font-mono">{userEmail}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                onClick={fetchAll}
              >
                <RefreshCcw className="mr-2 h-3.5 w-3.5" />
                <span className="font-mono text-xs">ACTUALISER</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className={sessionStatus.buttonColor}
                onClick={handle2FAAction}
              >
                <Smartphone className="mr-2 h-3.5 w-3.5" />
                <span className="font-mono text-xs">
                  {sessionStatus.buttonText}
                </span>
              </Button>

              {/* Bouton FERMER SESSION avec popup */}
              <Button
                variant="destructive"
                size="sm"
                className="border-red-700/50 bg-gradient-to-r from-red-900/40 to-rose-900/40 text-red-200 hover:from-red-800/60"
                onClick={() => setLogoutPopupOpen(true)}
              >
                <LogOut className="mr-2 h-3.5 w-3.5" />
                <span className="font-mono text-xs">FERMER SESSION</span>
              </Button>
            </div>
          </div>

          {/* Security Score */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-blue-700/50 bg-gradient-to-br from-gray-800 to-gray-900">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-mono text-sm font-semibold text-gray-300">
                    SCORE DE SÉCURITÉ
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-2xl font-bold ${getScoreColor(
                        securityScore
                      )}`}
                    >
                      {securityScore}/100
                    </span>
                    {securityScore >= 80 ? (
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-amber-400" />
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-xs text-gray-400">
                  ANALYSE EN TEMPS RÉEL
                </div>
                <div
                  className={`text-sm font-medium ${getScoreColor(
                    securityScore
                  )}`}
                >
                  {securityScore >= 80
                    ? "EXCELLENT"
                    : securityScore >= 60
                    ? "MODÉRÉ"
                    : "À AMÉLIORER"}
                </div>
              </div>
            </div>

            <div className="relative mt-4 h-3 overflow-hidden rounded-full bg-gray-800/50">
              <div
                className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ${getScoreBgColor(
                  securityScore
                )}`}
                style={{ width: `${securityScore}%` }}
              ></div>
            </div>

            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>FAIBLE</span>
              <span>MOYEN</span>
              <span>BON</span>
              <span>EXCELLENT</span>
            </div>
          </div>
        </div>

        {/* Security Dashboard Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Entries Card */}
          <Card className="border border-blue-700/30 bg-gradient-to-br from-gray-900/90 to-gray-950/90">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription className="flex items-center gap-2 text-xs text-gray-400">
                  <Database className="h-4 w-4" />
                  IDENTIFIANTS
                </CardDescription>
                <ShieldCheck className="h-5 w-5 text-blue-400" />
              </div>
              <CardTitle className="mt-4 text-4xl font-bold text-blue-200">
                {kpis.total}
                <span className="ml-2 text-lg text-blue-400">/∞</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700"
                    style={{ width: `${Math.min(kpis.total * 10, 100)}%` }}
                  ></div>
                </div>
                <span className="font-mono text-xs text-blue-400">
                  {kpis.total} ÉLÉMENTS
                </span>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                Stockage chiffré de bout en bout
              </p>
            </CardContent>
          </Card>

          {/* Weak Passwords Card */}
          <Card
            className={`border ${
              kpis.weak > 0 ? "border-red-700/30" : "border-emerald-700/30"
            } bg-gradient-to-br from-gray-900/90 to-gray-950/90`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription
                  className={`flex items-center gap-2 text-xs ${
                    kpis.weak > 0 ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  <ShieldAlert className="h-4 w-4" />
                  RISQUES
                </CardDescription>
                {kpis.weak > 0 ? (
                  <div className="animate-pulse">
                    <ShieldOff className="h-5 w-5 text-red-400" />
                  </div>
                ) : (
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                )}
              </div>
              <CardTitle
                className={`mt-4 text-4xl font-bold ${
                  kpis.weak > 0 ? "text-red-200" : "text-emerald-200"
                }`}
              >
                {kpis.weak}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                className={`font-mono text-xs ${
                  kpis.weak > 0
                    ? "bg-red-900/30 text-red-300"
                    : "bg-emerald-900/30 text-emerald-300"
                }`}
              >
                {kpis.weak > 0 ? (
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    ATTENTION REQUISE
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    SÉCURISÉ
                  </span>
                )}
              </Badge>
              <p
                className={`mt-3 text-xs ${
                  kpis.weak > 0 ? "text-red-400/70" : "text-emerald-400/70"
                }`}
              >
                {kpis.weak > 0
                  ? "Mots de passe faibles détectés"
                  : "Tous les mots de passe sont forts"}
              </p>
            </CardContent>
          </Card>

          {/* Reused Passwords Card */}
          <Card
            className={`border ${
              kpis.reused > 0 ? "border-amber-700/30" : "border-emerald-700/30"
            } bg-gradient-to-br from-gray-900/90 to-gray-950/90`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription
                  className={`flex items-center gap-2 text-xs ${
                    kpis.reused > 0 ? "text-amber-400" : "text-emerald-400"
                  }`}
                >
                  <Hash className="h-4 w-4" />
                  DUPLICATS
                </CardDescription>
                {kpis.reused > 0 ? (
                  <EyeOff className="h-5 w-5 text-amber-400" />
                ) : (
                  <Lock className="h-5 w-5 text-emerald-400" />
                )}
              </div>
              <CardTitle
                className={`mt-4 text-4xl font-bold ${
                  kpis.reused > 0 ? "text-amber-200" : "text-emerald-200"
                }`}
              >
                {kpis.reused}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                className={`font-mono text-xs ${
                  kpis.reused > 0
                    ? "bg-amber-900/30 text-amber-300"
                    : "bg-emerald-900/30 text-emerald-300"
                }`}
              >
                {kpis.reused > 0 ? (
                  <span className="flex items-center gap-1">
                    <XCircle className="h-3 w-3" />
                    VULNÉRABLE
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    UNIQUES
                  </span>
                )}
              </Badge>
              <p
                className={`mt-3 text-xs ${
                  kpis.reused > 0 ? "text-amber-400/70" : "text-emerald-400/70"
                }`}
              >
                {kpis.reused > 0
                  ? "Mots de passe réutilisés détectés"
                  : "Tous les mots de passe sont uniques"}
              </p>
            </CardContent>
          </Card>

          {/* 2FA Status Card */}
          <Card
            className={`border ${sessionStatus.cardColor} bg-gradient-to-br from-gray-900/90 to-gray-950/90`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription
                  className={`flex items-center gap-2 text-xs ${
                    sessionStatus.status === "COMPLÈTE"
                      ? "text-emerald-400"
                      : sessionStatus.status.includes("ATTENTE") ||
                        sessionStatus.status === "CONFIGURÉ"
                      ? "text-amber-400"
                      : "text-red-400"
                  }`}
                >
                  <LockKeyhole className="h-4 w-4" />
                  ÉTAT 2FA
                </CardDescription>
                {sessionStatus.icon}
              </div>
              <CardTitle className="mt-4 flex items-center gap-3 text-2xl font-bold">
                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl ${
                    sessionStatus.status === "COMPLÈTE"
                      ? "bg-emerald-900/30 border-emerald-700/30"
                      : sessionStatus.status.includes("ATTENTE") ||
                        sessionStatus.status === "CONFIGURÉ"
                      ? "bg-amber-900/30 border-amber-700/30"
                      : "bg-red-900/30 border-red-700/30"
                  }`}
                >
                  {sessionStatus.status === "COMPLÈTE" ? (
                    <Unlock className="h-6 w-6 text-emerald-400" />
                  ) : sessionStatus.status.includes("ATTENTE") ||
                    sessionStatus.status === "CONFIGURÉ" ? (
                    <Smartphone className="h-6 w-6 text-amber-400" />
                  ) : (
                    <Lock className="h-6 w-6 text-red-400" />
                  )}
                </div>
                <div>
                  <div
                    className={
                      sessionStatus.status === "COMPLÈTE"
                        ? "text-emerald-300"
                        : sessionStatus.status.includes("ATTENTE") ||
                          sessionStatus.status === "CONFIGURÉ"
                        ? "text-amber-300"
                        : "text-red-300"
                    }
                  >
                    {sessionStatus.status}
                  </div>
                  <div
                    className={`text-sm font-normal ${
                      sessionStatus.status === "COMPLÈTE"
                        ? "text-emerald-400/70"
                        : sessionStatus.status.includes("ATTENTE") ||
                          sessionStatus.status === "CONFIGURÉ"
                        ? "text-amber-400/70"
                        : "text-red-400/70"
                    }`}
                  >
                    {sessionStatus.description}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Secret configuré:
                  </span>
                  <Badge
                    className={`font-mono text-xs ${
                      account2FAConfigured
                        ? "bg-emerald-900/30 text-emerald-300"
                        : "bg-gray-800/50 text-gray-300"
                    }`}
                  >
                    {account2FAConfigured ? "CONFIGURÉ" : "NON CONFIGURÉ"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">2FA activé:</span>
                  <Badge
                    className={`font-mono text-xs ${
                      account2FAEnabled
                        ? "bg-emerald-900/30 text-emerald-300"
                        : "bg-gray-800/50 text-gray-300"
                    }`}
                  >
                    {account2FAEnabled ? "ACTIVÉ" : "INACTIF"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Session vérifiée:
                  </span>
                  <Badge
                    className={`font-mono text-xs ${
                      currentSession2FAVerified
                        ? "bg-emerald-900/30 text-emerald-300"
                        : "bg-amber-900/30 text-amber-300"
                    }`}
                  >
                    {currentSession2FAVerified ? "VÉRIFIÉE" : "EN ATTENTE"}
                  </Badge>
                </div>
              </div>
              <p
                className={`mt-3 text-xs ${
                  sessionStatus.status === "COMPLÈTE"
                    ? "text-emerald-400/70"
                    : sessionStatus.status.includes("ATTENTE") ||
                      sessionStatus.status === "CONFIGURÉ"
                    ? "text-amber-400/70"
                    : "text-red-400/70"
                }`}
              >
                {sessionStatus.status === "COMPLÈTE"
                  ? "Toutes les protections 2FA sont actives"
                  : sessionStatus.status === "CONFIGURÉ"
                  ? "2FA est configuré mais pas encore activé sur votre compte"
                  : sessionStatus.status.includes("ATTENTE")
                  ? "Vérifiez votre code 2FA pour accéder aux mots de passe"
                  : "Activez le 2FA pour renforcer la sécurité de votre compte"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 2FA Instructions Banner */}
        {sessionStatus.status !== "COMPLÈTE" && (
          <div className="mt-6 rounded-xl border border-amber-700/50 bg-gradient-to-r from-amber-900/20 to-amber-950/20 p-5">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-amber-700/50 bg-gradient-to-br from-amber-900/30 to-orange-900/30">
                <Cctv className="h-6 w-6 text-amber-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-amber-300">
                    {sessionStatus.status === "INACTIF" ||
                    sessionStatus.status === "CONFIGURÉ"
                      ? "ÉTAPE 1 : CONFIGURER L'AUTHENTIFICATION À DEUX FACTEURS"
                      : "ÉTAPE 2 : VÉRIFIEZ VOTRE SESSION ACTUELLE"}
                  </h3>
                  <Badge className="border border-amber-700/50 bg-amber-900/30 font-mono text-xs text-amber-300">
                    {sessionStatus.status === "INACTIF"
                      ? "CONFIGURATION REQUISE"
                      : sessionStatus.status === "CONFIGURÉ"
                      ? "ACTIVATION REQUISE"
                      : "SESSION À VÉRIFIER"}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-amber-200/80">
                  {sessionStatus.status === "INACTIF"
                    ? "Pour activer l'authentification à deux facteurs, cliquez sur 'ACTIVER 2FA' pour scanner le QR code avec votre application d'authentification (Google Authenticator, Authy, etc.)."
                    : sessionStatus.status === "CONFIGURÉ"
                    ? "Votre compte est configuré avec 2FA. Activez-le maintenant pour sécuriser votre compte."
                    : "Votre compte est configuré avec 2FA. Vérifiez votre session en entrant le code à 6 chiffres de votre application d'authentification."}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Button
                    className="bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800"
                    onClick={handle2FAAction}
                  >
                    {sessionStatus.status === "INACTIF" ||
                    sessionStatus.status === "CONFIGURÉ" ? (
                      <>
                        <QrCode className="mr-2 h-4 w-4" />
                        {sessionStatus.status === "INACTIF"
                          ? "COMMENCER LA CONFIGURATION"
                          : "ACTIVER 2FA"}
                      </>
                    ) : (
                      <>
                        <Smartphone className="mr-2 h-4 w-4" />
                        VÉRIFIER LA SESSION
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800/50"
                    onClick={fetch2FAStatus}
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Actualiser le statut
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[440px_1fr]">
          {/* Add Credential Panel */}
          <Card className="border border-blue-700/30 bg-gradient-to-br from-gray-900/90 to-gray-950/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-blue-700/30 bg-gradient-to-br from-gray-800 to-gray-900">
                  <Key className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-blue-200">AJOUTER UN IDENTIFIANT</div>
                  <div className="text-sm font-normal text-blue-400/70">
                    Stockage chiffré d'identifiants
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Server className="h-3.5 w-3.5" />
                      Service / Site
                    </div>
                  </Label>
                  <Input
                    id="service"
                    placeholder="entreprise.com"
                    className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500 focus:border-blue-500"
                    value={form.serviceName}
                    onChange={(e) =>
                      setForm({ ...form, serviceName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5" />
                      Identifiant / Email
                    </div>
                  </Label>
                  <Input
                    id="username"
                    placeholder="utilisateur@entreprise.com"
                    className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500 focus:border-blue-500"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pass" className="text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5" />
                      Mot de passe
                    </div>
                  </Label>
                  <Input
                    id="pass"
                    placeholder="••••••••••••"
                    type="password"
                    className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500 focus:border-blue-500"
                    value={form.encryptedPassword}
                    onChange={(e) =>
                      setForm({ ...form, encryptedPassword: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Bouton CHIFFRER ET STOCKER avec popup */}
                <Button
                  type="button"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                  onClick={() => {
                    if (form.serviceName && form.username && form.encryptedPassword) {
                      setEncryptPopupOpen(true);
                    } else {
                      alert("Veuillez remplir tous les champs");
                    }
                  }}
                  disabled={!form.serviceName || !form.username || !form.encryptedPassword}
                >
                  <FileLock className="mr-2 h-4 w-4" />
                  CHIFFRER ET STOCKER
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Vault Contents Panel */}
          <Card className="border border-gray-700 bg-gradient-to-br from-gray-900/90 to-gray-950/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900">
                  <HardDrive className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <div className="text-gray-200">CONTENU DU COFFRE-FORT</div>
                  <div className="text-sm font-normal text-gray-400">
                    {passwords.length} identifiant
                    {passwords.length !== 1 ? "s" : ""} • Accès 2FA:{" "}
                    {currentSession2FAVerified ? "✓ Actif" : "✗ Requis"}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {passwords.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900/50 p-10 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gray-700 bg-gray-900/50">
                    <Database className="h-8 w-8 text-gray-600" />
                  </div>
                  <p className="mt-4 text-sm text-gray-400">COFFRE-FORT VIDE</p>
                  <p className="mt-2 text-xs text-gray-500">
                    Ajoutez votre premier identifiant pour commencer
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-900/50">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700 bg-gray-800/50 hover:bg-transparent">
                        <TableHead className="text-sm text-gray-300">
                          Service
                        </TableHead>
                        <TableHead className="text-sm text-gray-300">
                          Identifiant
                        </TableHead>
                        <TableHead className="text-right text-sm text-gray-300">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {passwords.map((p) => (
                        <TableRow
                          key={p.id}
                          className="border-gray-800 hover:bg-gray-800/30"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="grid h-10 w-10 place-items-center rounded-lg border border-blue-700/30 bg-gradient-to-br from-gray-800 to-gray-900">
                                <Globe className="h-5 w-5 text-blue-400" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-200">
                                  {p.serviceName}
                                </div>
                                <div className="text-xs text-gray-500">
                                  AES-256 chiffré
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-300">
                              {p.username}
                            </div>
                            <div className="text-xs text-gray-500">
                              Identifiant sécurisé
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {/* Bouton VOIR avec popup */}
                              <Button
                                variant="secondary"
                                size="sm"
                                className={`border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 ${
                                  !currentSession2FAVerified ||
                                  revealId === p.id
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                                onClick={() => {
                                  setSelectedPassword(p);
                                  setViewPopupOpen(true);
                                }}
                                disabled={
                                  !currentSession2FAVerified ||
                                  revealId === p.id
                                }
                              >
                                {revealId === p.id ? (
                                  <>
                                    <div className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
                                    DÉCHIFFRAGE...
                                  </>
                                ) : currentSession2FAVerified ? (
                                  <>
                                    <Eye className="mr-2 h-3.5 w-3.5" />
                                    VOIR
                                  </>
                                ) : (
                                  <>
                                    <Lock className="mr-2 h-3.5 w-3.5" />
                                    2FA REQUIS
                                  </>
                                )}
                              </Button>

                              {/* Bouton SUPPRIMER avec popup */}
                              <Button
                                variant="destructive"
                                size="sm"
                                className="border-red-700/30 bg-red-900/30 text-red-300 hover:bg-red-800/40"
                                onClick={() => {
                                  setSelectedPassword(p);
                                  setDeletePopupOpen(true);
                                }}
                              >
                                <Trash2 className="mr-2 h-3.5 w-3.5" />
                                SUPPRIMER
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Security Footer */}
        <div className="mt-8 rounded-xl border border-gray-700 bg-gray-900/50 p-4">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <p className="text-xs text-gray-400">
                <span className="text-gray-300">CONNEXION:</span> SÉCURISÉE •
                <span className="text-blue-400"> PROTOCOLE:</span> TLS 1.3 •
                <span className="text-emerald-400"> 2FA:</span>{" "}
                {account2FAEnabled
                  ? "ACTIVÉ"
                  : account2FAConfigured
                  ? "CONFIGURÉ"
                  : "INACTIF"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  currentSession2FAVerified ? "bg-green-500" : "bg-amber-500"
                }`}
              ></span>
              <span className="text-xs text-gray-400">
                SESSION:{" "}
                {currentSession2FAVerified ? "2FA VÉRIFIÉE" : "2FA EN ATTENTE"}{" "}
                •{" "}
                {new Date().toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant Modal 2FA amélioré
function TwoFAModal({ page, qrCodeUrl, onClose, onVerify, onEnable }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (page === "setup") {
      setMessage(
        "Scannez le QR code avec votre application d'authentification, puis entrez le code pour activer le 2FA."
      );
    } else if (page === "verify") {
      setMessage("Entrez votre code 2FA pour vérifier votre session.");
    } else if (page === "activate") {
      setMessage(
        "Votre compte est configuré avec 2FA. Entrez votre code pour l'activer."
      );
    } else {
      setMessage("Gérez vos paramètres d'authentification à deux facteurs.");
    }
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.length !== 6) {
      setError("Le code doit contenir 6 chiffres.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const successResult = await onVerify(code);
      if (successResult) {
        setSuccess(
          "2FA activé avec succès ! Votre compte est maintenant sécurisé."
        );
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError("Code invalide. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEnable2FA = async () => {
    setLoading(true);
    setError("");
    try {
      await onEnable();
      setMessage("2FA activé. Scannez le QR code et entrez le code.");
    } catch {
      setError("Erreur lors de l'activation du 2FA.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-950 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-blue-700/50 bg-blue-900/30">
              <Smartphone className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Authentification à Deux Facteurs
              </h3>
              <p className="text-sm text-gray-400">
                {page === "setup"
                  ? "Configuration"
                  : page === "verify"
                  ? "Vérification"
                  : page === "activate"
                  ? "Activation"
                  : "Gestion"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-800 hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-300 mb-4">{message}</p>

          {success && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-900/30 border border-emerald-700/50">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <p className="text-sm text-emerald-300">{success}</p>
              </div>
            </div>
          )}

          {page === "setup" && qrCodeUrl && (
            <div className="mb-6 text-center">
              <div className="inline-block p-4 bg-white rounded-lg mb-3">
                <img src={qrCodeUrl} alt="QR Code 2FA" className="w-48 h-48" />
              </div>
              <p className="text-xs text-gray-400">
                Scannez ce QR code avec Google Authenticator ou une application
                similaire
              </p>
            </div>
          )}

          {(page === "setup" || page === "verify" || page === "activate") && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label
                  htmlFor="2fa-code"
                  className="text-sm text-gray-300 mb-2 block"
                >
                  Code à 6 chiffres
                </Label>
                <Input
                  id="2fa-code"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="text-center text-2xl tracking-widest font-mono border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500"
                  placeholder="123456"
                  required
                />
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-700/50">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                disabled={loading || code.length !== 6}
              >
                {loading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Vérification...
                  </>
                ) : page === "setup" ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Activer 2FA
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Vérifier
                  </>
                )}
              </Button>
            </form>
          )}

          {page === "manage" && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-gray-700 bg-gray-900/50">
                <p className="text-sm text-gray-300 mb-3">Gestion du 2FA</p>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700"
                    onClick={handleEnable2FA}
                    disabled={loading}
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Régénérer le QR Code
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-800/50"
                    onClick={onClose}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-amber-700/30 bg-amber-900/20 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-300">Sécurité</p>
              <p className="text-xs text-amber-300/80">
                Utilisez une application d'authentification comme Google
                Authenticator, Authy ou Microsoft Authenticator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}