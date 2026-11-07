"use client";

import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink, Mail, Phone, Smartphone, X } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Wordmark } from "@/components/layout/wordmark";
import type { RedemptionMethod } from "@/types/content";

interface Props {
  offerId: string;
  offerTitle: string;
  rewardLabel: string;
  businessName: string;
  method: RedemptionMethod;
  url?: string;
  code?: string;
  email?: string;
  phone?: string;
  expiryLabel?: string;
}

/**
 * The offer's primary action. Records a lightweight analytics beacon for
 * clicks / code reveals (Phase 2 wires /api/analytics to Supabase). It never
 * records a "redemption" — only the business can do that.
 */
export function RedemptionPanel(props: Props) {
  const { method } = props;
  const track = (event: "redeem_click" | "code_reveal") => {
    try {
      navigator.sendBeacon?.("/api/analytics", JSON.stringify({ offerId: props.offerId, event }));
    } catch {
      /* analytics must never block the user */
    }
  };

  return (
    <div className="rounded-[var(--radius-panel)] bg-white p-6 shadow-lift ring-1 ring-line">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-muted">Your Squab benefit</p>
      <p className="mt-2 font-display text-3xl font-extrabold text-ink">{props.rewardLabel}</p>
      {props.expiryLabel && <p className="mt-1 text-sm text-stone-muted">{props.expiryLabel}</p>}
      <div className="mt-6 space-y-3">
        {method === "show" && <ShowOffer {...props} />}
        {method === "code" && <RevealCode {...props} onReveal={() => track("code_reveal")} onShop={() => track("redeem_click")} />}
        {method === "link" && props.url && (
          <ButtonLink href={props.url} external size="lg" className="w-full" onClick={() => track("redeem_click")}>
            Book or enquire <ExternalLink aria-hidden />
          </ButtonLink>
        )}
        {(method === "contact" || method === "link") && (
          <ContactButtons email={props.email} phone={props.phone} onClick={() => track("redeem_click")} />
        )}
      </div>
    </div>
  );
}

function ContactButtons({ email, phone, onClick }: { email?: string; phone?: string; onClick: () => void }) {
  if (!email && !phone) return null;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {email && (
        <ButtonLink href={`mailto:${email}`} variant="secondary" size="lg" onClick={onClick}>
          <Mail aria-hidden /> Email
        </ButtonLink>
      )}
      {phone && (
        <ButtonLink href={`tel:${phone.replace(/\s/g, "")}`} variant="secondary" size="lg" onClick={onClick}>
          <Phone aria-hidden /> Call
        </ButtonLink>
      )}
    </div>
  );
}

function RevealCode(props: Props & { onReveal: () => void; onShop: () => void }) {
  const { code, url, onReveal, onShop } = props;
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showing, setShowing] = useState(false);
  if (!code) return null;
  return (
    <>
      {revealed ? (
        <div className="flex items-center gap-2 rounded-[var(--radius-control)] border-2 border-dashed border-squab-300 bg-squab-50 p-2 pl-4">
          <code className="flex-1 font-mono text-xl font-bold tracking-widest text-ink" aria-live="polite">{code}</code>
          <Button
            variant="dark"
            size="sm"
            onClick={async () => {
              await navigator.clipboard?.writeText(code);
              setCopied(true);
            }}
          >
            {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      ) : (
        <Button
          size="lg"
          className="w-full"
          onClick={() => {
            setRevealed(true);
            onReveal();
          }}
        >
          Reveal your code
        </Button>
      )}
      <Button
        variant="dark"
        size="lg"
        className="w-full"
        onClick={() => {
          if (!revealed) onReveal();
          setRevealed(true);
          setShowing(true);
        }}
      >
        <Smartphone aria-hidden /> Show at the counter
      </Button>
      {showing && <ShowScreen {...props} onClose={() => setShowing(false)} />}
      {url && (
        <ButtonLink href={url} external variant="secondary" size="lg" className="w-full" onClick={onShop}>
          Book or visit website <ExternalLink aria-hidden />
        </ButtonLink>
      )}
    </>
  );
}

function ShowOffer(props: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="lg" className="w-full" onClick={() => setOpen(true)}>
        <Smartphone aria-hidden /> Show this offer
      </Button>
      <p className="text-center text-sm text-stone-muted">Open this screen and show it to {props.businessName}.</p>
      {open && <ShowScreen {...props} onClose={() => setOpen(false)} />}
    </>
  );
}

/** Full-screen view to show at the counter: business, benefit, code and QR. */
function ShowScreen({ offerTitle, rewardLabel, businessName, code, onClose }: Props & { onClose: () => void }) {
  const [qr, setQr] = useState<string | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  useEffect(() => {
    if (!code) return;
    let live = true;
    import("qrcode").then((QR) =>
      QR.toString(code, { type: "svg", margin: 1, color: { dark: "#2d3748", light: "#ffffff" } }).then((svg) => live && setQr(svg)),
    );
    return () => {
      live = false;
    };
  }, [code]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Offer redemption screen" className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-squab-500 text-ink">
      <div className="flex items-center justify-between p-4">
        <span className="rounded-lg bg-white px-2 py-1.5"><Wordmark /></span>
        <button autoFocus onClick={onClose} className="grid size-11 place-items-center rounded-full bg-ink/10 hover:bg-ink/20" aria-label="Close">
          <X aria-hidden />
        </button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-10 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-ink/70">Squab customer offer</p>
        <p className="mt-4 text-lg font-semibold">{businessName}</p>
        <p className="mt-2 font-display text-5xl font-extrabold leading-none sm:text-6xl">{rewardLabel}</p>
        <p className="mt-3 max-w-sm text-lg">{offerTitle}</p>
        {code && (
          <div className="mt-8 rounded-[var(--radius-panel)] bg-white p-5 shadow-lift">
            {qr ? (
              <div aria-hidden className="mx-auto size-44 [&_svg]:size-full" dangerouslySetInnerHTML={{ __html: qr }} />
            ) : (
              <div aria-hidden className="mx-auto size-44 rounded-lg bg-mist" />
            )}
            <p className="mt-3 font-mono text-2xl font-bold tracking-[0.2em]">{code}</p>
          </div>
        )}
        <p className="mt-8 rounded-full bg-ink/10 px-4 py-2 text-sm font-medium">Show this screen at {businessName}</p>
      </div>
    </div>
  );
}
