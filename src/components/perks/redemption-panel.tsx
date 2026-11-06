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

function RevealCode({ code, url, onReveal, onShop }: Props & { onReveal: () => void; onShop: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
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
          Reveal discount code
        </Button>
      )}
      {url && (
        <ButtonLink href={url} external variant="secondary" size="lg" className="w-full" onClick={onShop}>
          Go to website <ExternalLink aria-hidden />
        </ButtonLink>
      )}
    </>
  );
}

function ShowOffer({ offerTitle, rewardLabel, businessName }: Props) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <>
      <Button size="lg" className="w-full" onClick={() => setOpen(true)}>
        <Smartphone aria-hidden /> Show this offer
      </Button>
      <p className="text-center text-sm text-stone-muted">Open this screen and show it to {businessName}.</p>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Offer redemption screen"
          className="fixed inset-0 z-50 flex flex-col bg-squab-700 text-white"
        >
          <div className="flex items-center justify-between p-4">
            <Wordmark inverted />
            <button
              autoFocus
              onClick={() => setOpen(false)}
              className="grid size-11 place-items-center rounded-full bg-white/15 hover:bg-white/25"
              aria-label="Close"
            >
              <X aria-hidden />
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/75">Squab Connect member offer</p>
            <p className="mt-6 text-lg font-semibold">{businessName}</p>
            <p className="mt-2 font-display text-5xl font-extrabold leading-none sm:text-6xl">{rewardLabel}</p>
            <p className="mt-4 max-w-sm text-xl">{offerTitle}</p>
            <p className="mt-10 rounded-full bg-white/15 px-4 py-2 text-sm">Show this screen when you visit or book</p>
          </div>
        </div>
      )}
    </>
  );
}
