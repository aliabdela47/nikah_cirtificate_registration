"use client";

import type { Certificate } from "@/types";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface CertificatePreviewProps {
  data: Certificate;
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col sm:flex-row">
    <p className="w-full sm:w-1/3 font-semibold text-foreground/80">{label}:</p>
    <p className="w-full sm:w-2/3 font-body">{value}</p>
  </div>
);

const SignatureLine = ({ name }: { name: string }) => (
    <div className="mt-6 text-center">
        <p className="border-b-2 border-dotted border-foreground/50 w-48 mx-auto">&nbsp;</p>
        <p className="text-sm mt-2">{name}</p>
    </div>
)

export default function CertificatePreview({ data }: CertificatePreviewProps) {
  const templateStyles = {
    classic: "border-primary/20",
    modern: "border-accent",
    floral: "border-green-500", // Placeholder for floral
  };
  
  return (
    <Card id="certificate-preview" className={cn("w-full max-w-4xl aspect-[1/1.414] bg-card p-6 md:p-10 shadow-2xl transition-all duration-300 transform md:hover:scale-105", templateStyles[data.template])}>
      <div className={cn("w-full h-full border-2 p-4 md:p-6 flex flex-col", templateStyles[data.template])}>
        <div className="text-center">
          <h2 className="text-2xl font-headline tracking-wider text-primary">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </h2>
          <h1 className="text-3xl md:text-4xl font-bold font-headline mt-2 text-primary tracking-tight">
            Certificate of Nikah - Nikac Sumaqta
          </h1>
          <p className="text-lg text-muted-foreground font-headline">Marriage Contract</p>
        </div>

        <p className="mt-8 text-center font-body text-md leading-relaxed">
          {data.preamble}
        </p>

        <Separator className="my-6 bg-primary/20" />
        
        <div className="space-y-6 text-sm">
            <div className="p-4 bg-primary/5 rounded-lg flex gap-4 items-center">
                {data.groomPhoto ? (
                    <Image src={data.groomPhoto} data-ai-hint="man portrait" alt="Groom's Photo" width={100} height={100} className="rounded-lg object-cover aspect-square" />
                ) : (
                    <div className="w-[100px] h-[100px] rounded-lg bg-primary/10 flex items-center justify-center text-primary/40">
                        <User className="w-10 h-10" />
                    </div>
                )}
                <div className="flex-1">
                    <h3 className="font-headline text-lg text-primary mb-3">The Groom</h3>
                    <div className="space-y-2">
                        <DetailRow label="Name" value={data.groomName} />
                        <DetailRow label="Father's Name" value={data.groomFatherName} />
                        <DetailRow label="Address" value={data.groomAddress} />
                    </div>
                </div>
            </div>
             <div className="p-4 bg-accent/5 rounded-lg flex gap-4 items-center">
                 {data.bridePhoto ? (
                    <Image src={data.bridePhoto} data-ai-hint="woman portrait" alt="Bride's Photo" width={100} height={100} className="rounded-lg object-cover aspect-square" />
                ) : (
                    <div className="w-[100px] h-[100px] rounded-lg bg-accent/10 flex items-center justify-center text-accent/40">
                        <User className="w-10 h-10" />
                    </div>
                )}
                <div className="flex-1">
                    <h3 className="font-headline text-lg text-accent mb-3">The Bride</h3>
                     <div className="space-y-2">
                        <DetailRow label="Name" value={data.brideName} />
                        <DetailRow label="Father's Name" value={data.brideFatherName} />
                        <DetailRow label="Address" value={data.brideAddress} />
                    </div>
                </div>
            </div>
        </div>

        <Separator className="my-6 bg-primary/20" />

        <div className="space-y-2 text-sm">
            <DetailRow label="Date of Nikah" value={data.nikahDate ? format(data.nikahDate, "EEEE, MMMM d, yyyy") : "Not set"} />
            <DetailRow label="Place of Nikah" value={data.nikahPlace} />
            <DetailRow label="Mahr" value={data.mahr} />
        </div>

        <div className="flex-grow" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mt-8">
            <div className="md:col-span-2">
                <h3 className="font-headline text-center mb-4">Waditte</h3>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-headline text-center mb-2 text-primary">Groom's Witnesses</h4>
                        <SignatureLine name={data.groomWitness1Name}/>
                        <SignatureLine name={data.groomWitness2Name}/>
                        <SignatureLine name={data.groomWitness3Name}/>
                    </div>
                    <div>
                        <h4 className="font-headline text-center mb-2 text-accent">Bride's Witnesses</h4>
                        <SignatureLine name={data.brideWitness1Name}/>
                        <SignatureLine name={data.brideWitness2Name}/>
                        <SignatureLine name={data.brideWitness3Name}/>
                    </div>
                </div>
            </div>
             <div className="flex flex-col items-center justify-end h-full">
                <Image 
                    src="https://placehold.co/120x120.png"
                    data-ai-hint="islamic calligraphy"
                    alt="Official Seal" 
                    width={100} 
                    height={100} 
                    className="opacity-80 mt-auto"
                />
                <p className="text-sm mt-2 text-muted-foreground">Official Seal</p>
             </div>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-8">Certificate ID: {data.id}</p>
      </div>
    </Card>
  );
}
