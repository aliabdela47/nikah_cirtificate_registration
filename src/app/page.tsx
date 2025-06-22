"use client";

import { useState, useEffect } from "react";
import type { Certificate } from "@/types";
import CertificateForm from "@/components/CertificateForm";
import CertificatePreview from "@/components/CertificatePreview";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { generatePreamble } from "@/ai/flows/generate-preamble";
import { format } from "date-fns";

export default function Home() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const [data, setData] = useState<Certificate>({
    id: "",
    groomName: "Zayn Al-Abidin",
    groomFatherName: "Yusuf Al-Abidin",
    groomAddress: "123 Iman St, Medina, SA",
    groomPhoto: "",
    brideName: "Aaliyah Bint-Abdullah",
    brideFatherName: "Abdullah ibn-Ali",
    brideAddress: "456 Taqwa Ln, Mecca, SA",
    bridePhoto: "",
    nikahDate: undefined,
    nikahPlace: "Masjid an-Nabawi",
    mahr: "A trip to Hajj and a golden Quran",
    groomWitness1Name: "Hamza ibn-Umar",
    groomWitness2Name: "Ali ibn-Talib",
    groomWitness3Name: "Saad ibn-Abi Waqqas",
    brideWitness1Name: "Fatima Bint-Ahmad",
    brideWitness2Name: "Aisha Bint-Abu Bakr",
    brideWitness3Name: "Khadija Bint-Khuwaylid",
    preamble:
      "In the name of Allah, the Most Gracious, the Most Merciful. With hearts full of gratitude, we celebrate the sacred union of Zayn Al-Abidin and Aaliyah Bint-Abdullah, bound by the covenant of Nikah. May their journey together be a testament to faith, a partnership of love, and a source of tranquility, blessed by Allah's infinite grace.",
    template: "classic",
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      id: `NIKAH-${Date.now()}`,
      nikahDate: new Date(),
    }));
    setIsInitialized(true);
  }, []);

  const handleGeneratePreamble = async () => {
    if (!data.groomName || !data.brideName || !data.nikahDate || !data.nikahPlace) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in the groom, bride, date, and place details before generating the preamble.",
      });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generatePreamble({
        groomName: data.groomName,
        brideName: data.brideName,
        date: format(data.nikahDate, "MMMM d, yyyy"),
        place: data.nikahPlace,
        additionalDetails: `The Mahr agreed upon is: ${data.mahr}.`,
      });
      setData((prev) => ({ ...prev, preamble: result.preamble }));
      toast({
        title: "Preamble Generated",
        description: "The AI-powered preamble has been successfully created.",
      });
    } catch (error) {
      console.error("Failed to generate preamble:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating the preamble. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    window.print();
  };
  
  const handleSave = () => {
    // In a real app, this would save to a database.
    // Here, we'll just show a success message.
    toast({
      title: "Certificate Saved",
      description: "Your certificate data has been saved successfully.",
    });
  }

  if (!isInitialized) {
    return null; // or a loading spinner
  }


  return (
    <div className="flex flex-col h-screen bg-background">
      <Header onSave={handleSave} onDownload={handleDownload} />
      <main className="flex-1 overflow-hidden">
        <div className="grid md:grid-cols-2 h-full">
          <div id="certificate-form-container" className="overflow-y-auto p-4 md:p-6">
            <CertificateForm
              data={data}
              setData={setData}
              onGeneratePreamble={handleGeneratePreamble}
              isGenerating={isGenerating}
            />
          </div>
          <div id="certificate-preview-container" className="bg-secondary/30 overflow-y-auto p-4 md:p-10 flex justify-center items-start">
            <CertificatePreview data={data} />
          </div>
        </div>
      </main>
    </div>
  );
}
