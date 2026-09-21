import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  QrCode,
  Shield,
  KeyRound,
  Smartphone,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Copy,
  SmartphoneIcon,
  ShieldCheck,
  Lock,
  Scan,
  Fingerprint,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

export default function Enable2FA() {
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const enable = async () => {
    setLoading(true);
    setError("");
    try {
      const email = localStorage.getItem("email");
      const res = await api.post(`/auth/2fa/enable?email=${encodeURIComponent(email)}`);
      setQrUrl(res.data.qrCodeUrl);
    } catch (err) {
      console.error(err.response?.status, err.response?.data);
      setError("Failed to enable 2FA. Please check console for details.");
      alert("Enable 2FA فشل. شوف console.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleVerify = () => {
    navigate("/2fa"); // Navigate to verification page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(56,189,248,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(168,85,247,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-6 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
              <Shield className="h-7 w-7 text-cyan-400" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                Enable Two-Factor Authentication
              </h1>
              <p className="mt-1 text-sm text-cyan-300/80">
                Add an extra layer of security to your SecureVault account
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Instructions */}
          <div className="space-y-6">
            <Card className="border border-cyan-500/30 bg-gradient-to-br from-blue-950/40 to-cyan-950/40 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-cyan-200">
                  <ShieldCheck className="h-6 w-6 text-emerald-400" />
                  Why Enable 2FA?
                </CardTitle>
                <CardDescription className="text-cyan-300/70">
                  Protect your vault with multi-factor authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500/20">
                      <Lock className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-300">Enhanced Security</h4>
                      <p className="text-sm text-emerald-300/70">
                        Require both password and 2FA code for access
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-blue-500/20 bg-blue-950/20 p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-blue-500/20">
                      <Fingerprint className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-300">Password Reveal Protection</h4>
                      <p className="text-sm text-blue-300/70">
                        2FA required to decrypt and view stored passwords
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-purple-500/20 bg-purple-950/20 p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-purple-500/20">
                      <ShieldAlert className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-300">Prevent Unauthorized Access</h4>
                      <p className="text-sm text-purple-300/70">
                        Even if password is compromised, account stays secure
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-orange-950/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-amber-200">
                  <Smartphone className="h-6 w-6 text-amber-400" />
                  Prerequisites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-amber-500/20">
                      <span className="text-xs font-bold text-amber-400">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-amber-300">Install Authenticator App</p>
                      <p className="text-sm text-amber-300/70">
                        Google Authenticator, Authy, Microsoft Authenticator, or any TOTP app
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-amber-500/20">
                      <span className="text-xs font-bold text-amber-400">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-amber-300">Secure Your Device</p>
                      <p className="text-sm text-amber-300/70">
                        Use a device that you always have access to
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-amber-500/20">
                      <span className="text-xs font-bold text-amber-400">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-amber-300">Backup Codes</p>
                      <p className="text-sm text-amber-300/70">
                        Save backup codes in a secure location
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - QR Code Generator */}
          <div className="space-y-6">
            <Card className="border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-green-950/40 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-emerald-200">
                  <Scan className="h-6 w-6 text-emerald-400" />
                  Setup 2FA
                </CardTitle>
                <CardDescription className="text-emerald-300/70">
                  Generate QR code and scan with your authenticator app
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!qrUrl ? (
                  <div className="space-y-4">
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500/20">
                          <KeyRound className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-emerald-300">Ready to Secure Your Account?</h4>
                          <p className="text-sm text-emerald-300/70">
                            Generate a unique QR code for your authenticator app
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-emerald-300">Current Email</Label>
                      <Input
                        value={localStorage.getItem("email") || ""}
                        readOnly
                        className="border-emerald-500/30 bg-emerald-950/30 text-emerald-300"
                      />
                      <p className="text-xs text-emerald-300/70">
                        2FA will be enabled for this account
                      </p>
                    </div>

                    {error && (
                      <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="h-5 w-5 text-red-400" />
                          <p className="text-sm text-red-300">{error}</p>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={enable}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700"
                    >
                      {loading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Generating QR Code...
                        </>
                      ) : (
                        <>
                          <QrCode className="mr-2 h-5 w-5" />
                          Generate QR Code
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-400" />
                        <div>
                          <h4 className="font-semibold text-emerald-300">QR Code Generated Successfully</h4>
                          <p className="text-sm text-emerald-300/70">
                            Scan with your authenticator app
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* QR Code Display */}
                    <div className="space-y-4">
                      <div className="relative mx-auto w-64">
                        <div className="absolute inset-0 rounded-2xl border-4 border-emerald-500/30"></div>
                        <div className="relative rounded-xl border border-emerald-500/50 bg-white p-4">
                          <img
                            src={qrUrl}
                            alt="2FA QR Code"
                            className="w-full"
                          />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                          <Badge className="border border-emerald-500/30 bg-gradient-to-r from-emerald-900/40 to-green-900/40 px-3 py-1 font-mono text-xs text-emerald-300">
                            SECURE QR
                          </Badge>
                        </div>
                      </div>

                      <div className="rounded-lg border border-blue-500/20 bg-blue-950/20 p-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-blue-300">How to Scan:</h4>
                          <ol className="space-y-2 text-sm text-blue-300/80">
                            <li className="flex items-center gap-2">
                              <div className="grid h-5 w-5 place-items-center rounded-full bg-blue-500/20">
                                <span className="text-xs">1</span>
                              </div>
                              Open your authenticator app
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="grid h-5 w-5 place-items-center rounded-full bg-blue-500/20">
                                <span className="text-xs">2</span>
                              </div>
                              Tap "Add Account" or "+" button
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="grid h-5 w-5 place-items-center rounded-full bg-blue-500/20">
                                <span className="text-xs">3</span>
                              </div>
                              Select "Scan QR Code"
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="grid h-5 w-5 place-items-center rounded-full bg-blue-500/20">
                                <span className="text-xs">4</span>
                              </div>
                              Point camera at the QR code above
                            </li>
                          </ol>
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <Button
                          variant="outline"
                          className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 text-cyan-300 hover:bg-cyan-900/40"
                          onClick={enable}
                        >
                          <QrCode className="mr-2 h-4 w-4" />
                          Generate New QR
                        </Button>

                        <Button
                          onClick={handleVerify}
                          className="bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700"
                        >
                          Next: Verify Code
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-orange-950/20 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-amber-200">
                  <AlertCircle className="h-6 w-6 text-amber-400" />
                  Important Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-amber-500/20">
                    <span className="text-xs">!</span>
                  </div>
                  <p className="text-amber-300/80">
                    <span className="font-semibold text-amber-300">Without 2FA:</span> You won't be able to reveal passwords from the vault
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-amber-500/20">
                    <span className="text-xs">!</span>
                  </div>
                  <p className="text-amber-300/80">
                    <span className="font-semibold text-amber-300">Backup:</span> Save backup codes or ensure you have access to your authenticator app
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-amber-500/20">
                    <span className="text-xs">!</span>
                  </div>
                  <p className="text-amber-300/80">
                    <span className="font-semibold text-amber-300">Time Sync:</span> Ensure your authenticator app time is synchronized
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-8 rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/20 to-blue-950/20 p-4 backdrop-blur-xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 delay-75"></div>
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 delay-150"></div>
              </div>
              <p className="font-mono text-xs text-cyan-300/70">
                <span className="text-cyan-400">2FA STATUS:</span> SETUP IN PROGRESS • 
                <span className="text-emerald-400"> SECURITY:</span> ENHANCED
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="border border-cyan-500/30 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 px-3 py-1 font-mono text-xs text-cyan-300">
                TOTP • 6-DIGIT • 30s
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}