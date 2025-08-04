typescriptreact
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Search } from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar"; // Assuming you have a Sidebar component
import Header from "@/components/Header"; // Assuming you have a Header component
  id: string;
  groomName: string;
  brideName: string;
  date: string;
}

const initialCertificates: Certificate[] = [
  { id: "001", groomName: "John Doe", brideName: "Jane Smith", date: "2023-10-27" },
  { id: "002", groomName: "Peter Jones", brideName: "Mary Brown", date: "2023-11-15" },
  // Add more dummy data
];

export default function DashboardPage() {
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);

  const filteredCertificates = certificates.filter((certificate) =>
    certificate.groomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    certificate.brideName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    certificate.id.includes(searchTerm)
  );

  const handleDelete = (id: string) => {
    setCertificates(certificates.filter((cert) => cert.id !== id));
  };

  const handleEdit = (certificate: Certificate) => {
    setEditingCertificate(certificate);
  };

  const handleSaveEdit = (updatedCertificate: Certificate) => {
    setCertificates(certificates.map((cert) =>
      cert.id === updatedCertificate.id ? updatedCertificate : cert
    ));
    setEditingCertificate(null);
  };

  const handleCancelEdit = () => {
    setEditingCertificate(null);
  };

 return (
    <div>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar /> {/* Navigation Menu */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          <div className="mb-6 flex items-center space-x-4">
            <Label htmlFor="search" className="sr-only">Search Certificates</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button variant="outline"><Search className="mr-2 h-4 w-4" /> Search</Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Manage Certificates</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Groom Name</TableHead>
                  <TableHead>Bride Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCertificates.map((certificate) => (
                  <TableRow key={certificate.id}>
                    <TableCell>{certificate.id}</TableCell>
                    <TableCell>
                      {editingCertificate?.id === certificate.id ? (
                        <Input
                          value={editingCertificate.groomName}
                          onChange={(e) => setEditingCertificate({ ...editingCertificate, groomName: e.target.value })}
                        />
                      ) : (
                        certificate.groomName
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCertificate?.id === certificate.id ? (
                        <Input
                          value={editingCertificate.brideName}
                          onChange={(e) => setEditingCertificate({ ...editingCertificate, brideName: e.target.value })}
                        />
                      ) : (
                        certificate.brideName
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCertificate?.id === certificate.id ? (
                        <Input
                          type="date"
                          value={editingCertificate.date}
                          onChange={(e) => setEditingCertificate({ ...editingCertificate, date: e.target.value })}
                        />
                      ) : (
                        certificate.date
                      )}
                    </TableCell>
                    <TableCell className="flex space-x-2">
                      {editingCertificate?.id === certificate.id ? (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleSaveEdit(editingCertificate)}>Save</Button>
                          <Button variant="outline" size="sm" onClick={handleCancelEdit}>Cancel</Button>
                        </>
                      ) : (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(certificate)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(certificate.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}