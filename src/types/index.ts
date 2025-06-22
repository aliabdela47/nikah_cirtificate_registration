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
  witness1Name: string;
  witness2Name: string;
  preamble: string;
  template: 'classic' | 'modern' | 'floral';
}
