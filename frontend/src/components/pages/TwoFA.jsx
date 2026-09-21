import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  Clock,
  Lock,
  CheckCircle,
  AlertCircle,
  Smartphone,
} from "lucide-react";

export default function TwoFA() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const verify = async () => {
    if (code.length !== 6) {
      setError("Code must be 6 digits");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const res = await api.post("/auth/2fa/verify", { code: Number(code) });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("twoFaOk", "true");

      // Navigate to dashboard with success state
      navigate("/dashboard", { replace: true, state: { twoFaVerified: true } });
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      verify();
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(56,189,248,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(168,85,247,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative mx-auto max-w-md px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Main Card */}
        <Card className="border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-green-950/40 backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/30 to-green-900/30 mb-4">
              <Lock className="h-8 w-8 text-emerald-400" />
            </div>
            <CardTitle className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
              Two-Factor Authentication
            </CardTitle>
            <CardDescription className="text-emerald-300/80">
              Enter the 6-digit code from your authenticator app
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Code Input */}
            <div className="space-y-3">
              <Label htmlFor="code" className="text-emerald-300">
                <div className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4" />
                  6-DIGIT VERIFICATION CODE
                </div>
              </Label>
              <div className="relative">
                <Input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="000000"
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setCode(value.slice(0, 6));
                    setError("");
                  }}
                  onKeyPress={handleKeyPress}
                  className="border-emerald-500/30 bg-emerald-950/30 text-center text-2xl font-bold tracking-widest text-emerald-300 placeholder:text-emerald-700/50 h-14"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Badge className="border border-emerald-500/30 bg-gradient-to-r from-emerald-900/40 to-green-900/40 font-mono text-xs text-emerald-300">
                    TOTP
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-emerald-400/70">
                  <Clock className="h-3.5 w-3.5" />
                  30-second code
                </span>
                <span className="text-emerald-400/70">
                  {code.length}/6 digits
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div>
                    <p className="font-medium text-red-300">Verification Failed</p>
                    <p className="text-sm text-red-300/80">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Verification Info */}
            <div className="rounded-lg border border-blue-500/20 bg-blue-950/20 p-4">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-blue-500/30 bg-blue-900/20">
                  <Smartphone className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-300">Where to find your code?</h4>
                  <ul className="mt-2 space-y-1 text-sm text-blue-300/80">
                    <li>• Open your authenticator app (Google Authenticator, Authy, etc.)</li>
                    <li>• Look for "SecureVault" or your email account</li>
                    <li>• Enter the 6-digit code displayed</li>
                    <li>• Codes refresh every 30 seconds</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={verify}
                disabled={loading || code.length !== 6}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 h-12 text-lg"
              >
                {loading ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    Verify & Continue
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-emerald-400/70">
                <ShieldAlert className="h-4 w-4" />
                <span>Verification required for password access</span>
              </div>
            </div>

            {/* Help Links */}
            <div className="pt-4 border-t border-emerald-500/20">
              <div className="flex flex-col gap-3 text-center">
                <Button
                  variant="link"
                  className="text-emerald-400 hover:text-emerald-300"
                  onClick={() => navigate("/2fa/enable")}
                >
                  Need to setup 2FA first?
                </Button>
                <Button
                  variant="link"
                  className="text-cyan-400 hover:text-cyan-300 text-sm"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("twoFaOk");
                    navigate("/login");
                  }}
                >
                  Sign out and try again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Footer */}
        <div className="mt-8 rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/20 to-blue-950/20 p-4 backdrop-blur-xl">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 delay-75"></div>
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 delay-150"></div>
              </div>
              <p className="font-mono text-xs text-cyan-300/70">
                <span className="text-emerald-400">AUTHENTICATION:</span> 2FA VERIFICATION •
                <span className="text-blue-400"> PROTOCOL:</span> TOTP
              </p>
            </div>
            <div className="text-xs text-cyan-500/50">
              Code expires in 30 seconds • Time-synchronized
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}