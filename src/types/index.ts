export interface Certificate {
  id: string;
  groomName: string;
  groomFatherName: string;
  groomAddress: string;
  brideName: string;
  brideFatherName: string;
  brideAddress: string;
  nikahDate: Date | undefined;
  nikahPlace: string;
  mahr: string;
  groomWitness1Name: string;
  groomWitness2Name: string;
  groomWitness3Name: string;
  brideWitness1Name: string;
  brideWitness2Name: string;
  brideWitness3Name: string;
  preamble: string;
  template: 'classic' | 'modern' | 'floral';
}
