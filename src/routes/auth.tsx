import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import logo from "@/assets/justfin-logo.png";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Recruiter Access | JUSTFIN" },
    { name: "description", content: "Secure recruiter access for JUSTFIN application management." },
    { property: "og:title", content: "Recruiter Access | JUSTFIN" },
    { property: "og:description", content: "Secure recruiter access for JUSTFIN." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }), component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function signIn(event: React.FormEvent) {
    event.preventDefault(); setError(""); setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) { setError("The email or password was not recognized."); setLoading(false); return; }
    await navigate({ to: "/recruiter" });
  }
  return <main className="grid min-h-screen bg-foreground text-background lg:grid-cols-2"><section className="hidden hero-grid relative items-end overflow-hidden p-14 lg:flex"><div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_35%)]"/><div className="relative max-w-xl"><p className="eyebrow">Private recruiter workspace</p><h1 className="font-display text-6xl font-semibold">Review every application with care.</h1><p className="mt-6 text-lg leading-8 text-background/60">Applicant information and documents remain private and are available only to authorized recruiters.</p></div></section><section className="flex items-center justify-center bg-background px-5 py-16 text-foreground"><div className="w-full max-w-md"><a href="/" className="mb-14 inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="size-4"/>Return to JUSTFIN</a><div className="flex items-center gap-3"><img src={logo} alt="JUSTFIN" className="size-11 rounded-md object-cover"/><span className="font-display text-xl font-bold tracking-[.16em]">JUSTFIN</span></div><div className="mt-10"><LockKeyhole className="size-7 text-primary"/><h2 className="mt-5 font-display text-4xl font-semibold">Recruiter access</h2><p className="mt-3 text-muted-foreground">Sign in with your authorized recruiter credentials.</p></div><form onSubmit={signIn} className="mt-9 space-y-5"><label><span className="label">Email address</span><input className="input mt-2" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label><span className="label">Password</span><input className="input mt-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>{error&&<p className="text-sm text-destructive">{error}</p>}<Button className="w-full" size="lg" disabled={loading}>{loading?"Signing in…":"Sign in securely"}</Button></form><p className="mt-6 text-xs leading-5 text-muted-foreground">Candidate applications never require an account. This area is exclusively for authorized recruitment personnel.</p></div></section></main>
}