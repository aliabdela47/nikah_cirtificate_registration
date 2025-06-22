"use client";

import type { Certificate } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface CertificateFormProps {
  data: Certificate;
  setData: React.Dispatch<React.SetStateAction<Certificate>>;
  onGeneratePreamble: () => void;
  isGenerating: boolean;
}

export default function CertificateForm({
  data,
  setData,
  onGeneratePreamble,
  isGenerating,
}: CertificateFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setData((prev) => ({...prev, nikahDate: date}))
  }

  const handleTemplateChange = (value: 'classic' | 'modern' | 'floral') => {
    setData((prev) => ({...prev, template: value}));
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline">Certificate Details</CardTitle>
        <CardDescription>Enter the information to be included on the Nikah certificate.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="couple">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="couple">Couple</TabsTrigger>
            <TabsTrigger value="ceremony">Ceremony</TabsTrigger>
            <TabsTrigger value="extra">Witnesses & Style</TabsTrigger>
          </TabsList>
          <TabsContent value="couple" className="mt-6">
            <div className="space-y-6">
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold font-headline text-lg text-primary">Groom's Details</h3>
                <div className="grid gap-2">
                  <Label htmlFor="groomName">Full Name</Label>
                  <Input id="groomName" name="groomName" value={data.groomName} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="groomFatherName">Father's Name</Label>
                  <Input id="groomFatherName" name="groomFatherName" value={data.groomFatherName} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="groomAddress">Address</Label>
                  <Input id="groomAddress" name="groomAddress" value={data.groomAddress} onChange={handleInputChange} />
                </div>
              </div>
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold font-headline text-lg text-primary">Bride's Details</h3>
                <div className="grid gap-2">
                  <Label htmlFor="brideName">Full Name</Label>
                  <Input id="brideName" name="brideName" value={data.brideName} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="brideFatherName">Father's Name</Label>
                  <Input id="brideFatherName" name="brideFatherName" value={data.brideFatherName} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="brideAddress">Address</Label>
                  <Input id="brideAddress" name="brideAddress" value={data.brideAddress} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="ceremony" className="mt-6 space-y-6">
             <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nikahDate">Date of Nikah</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !data.nikahDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {data.nikahDate ? format(data.nikahDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={data.nikahDate}
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nikahPlace">Place of Nikah</Label>
                  <Input id="nikahPlace" name="nikahPlace" value={data.nikahPlace} onChange={handleInputChange} />
                </div>
             </div>
              <div className="grid gap-2">
                <Label htmlFor="mahr">Mahr (Dowry)</Label>
                <Textarea id="mahr" name="mahr" value={data.mahr} onChange={handleInputChange} placeholder="Describe the Mahr agreed upon..." />
              </div>
              <div className="grid gap-2">
                 <div className="flex justify-between items-center">
                    <Label htmlFor="preamble">Preamble</Label>
                    <Button variant="ghost" size="sm" onClick={onGeneratePreamble} disabled={isGenerating}>
                      <Sparkles className="mr-2 h-4 w-4 text-accent" />
                      {isGenerating ? "Generating..." : "Generate with AI"}
                    </Button>
                  </div>
                <Textarea id="preamble" name="preamble" value={data.preamble} onChange={handleInputChange} rows={6} placeholder="The opening text of the certificate..." />
              </div>
          </TabsContent>
          <TabsContent value="extra" className="mt-6 space-y-6">
            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold font-headline text-lg text-primary">Groom's Witnesses</h3>
                <div className="grid gap-2">
                  <Label htmlFor="groomWitness1Name">Witness 1 Full Name</Label>
                  <Input id="groomWitness1Name" name="groomWitness1Name" value={data.groomWitness1Name} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="groomWitness2Name">Witness 2 Full Name</Label>
                  <Input id="groomWitness2Name" name="groomWitness2Name" value={data.groomWitness2Name} onChange={handleInputChange} />
                </div>
                 <div className="grid gap-2">
                  <Label htmlFor="groomWitness3Name">Witness 3 Full Name</Label>
                  <Input id="groomWitness3Name" name="groomWitness3Name" value={data.groomWitness3Name} onChange={handleInputChange} />
                </div>
            </div>
            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold font-headline text-lg text-accent">Bride's Witnesses</h3>
                <div className="grid gap-2">
                  <Label htmlFor="brideWitness1Name">Witness 1 Full Name</Label>
                  <Input id="brideWitness1Name" name="brideWitness1Name" value={data.brideWitness1Name} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="brideWitness2Name">Witness 2 Full Name</Label>
                  <Input id="brideWitness2Name" name="brideWitness2Name" value={data.brideWitness2Name} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="brideWitness3Name">Witness 3 Full Name</Label>
                  <Input id="brideWitness3Name" name="brideWitness3Name" value={data.brideWitness3Name} onChange={handleInputChange} />
                </div>
            </div>
               <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold font-headline text-lg text-primary">Certificate Style</h3>
                <RadioGroup value={data.template} onValueChange={handleTemplateChange}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="classic" id="r1" />
                    <Label htmlFor="r1">Classic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="modern" id="r2" />
                    <Label htmlFor="r2">Modern</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="floral" id="r3" />
                    <Label htmlFor="r3">Floral</Label>
                  </div>
                </RadioGroup>
              </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
