'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Building2, Briefcase, CheckCircle2, Clock, XCircle, Award } from 'lucide-react';
import type { CompanyWithStats } from '@/lib/companies';

export default function Home() {
  const [companies, setCompanies] = useState<CompanyWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await fetch('/api/companies');
      if (!res.ok) {
        console.error('Failed to fetch companies:', res.statusText);
        setCompanies([]);
        return;
      }
      const data = await res.json();
      // Ensure data is an array
      if (Array.isArray(data)) {
        setCompanies(data);
      } else {
        console.error('Invalid response format:', data);
        setCompanies([]);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompany = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      careersUrl: formData.get('careersUrl') as string,
      targetRoles: formData.get('targetRoles') as string,
      preferredLocation: formData.get('preferredLocation') as string || 'Mumbai, India',
      logoUrl: formData.get('logoUrl') as string || undefined,
    };

    try {
      const res = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setShowAddModal(false);
        fetchCompanies();
        e.currentTarget.reset();
      }
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center py-12">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">
            Track your internship applications across companies
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add New Company</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCompany} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Company Name *</label>
                  <input
                    name="name"
                    required
                    className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Careers Page URL *</label>
                  <input
                    name="careersUrl"
                    type="url"
                    required
                    className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Target Roles *</label>
                  <input
                    name="targetRoles"
                    required
                    placeholder="e.g., Software Intern, Analyst Intern"
                    className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Preferred Location</label>
                  <input
                    name="preferredLocation"
                    defaultValue="Mumbai, India"
                    className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Logo URL (optional)</label>
                  <input
                    name="logoUrl"
                    type="url"
                    className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">Add Company</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {!loading && companies.length === 0 ? (
        <Card className="py-12">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <Building2 className="mb-4 h-12 w-12 text-slate-500" />
            <h3 className="mb-2 text-lg font-semibold">No companies yet</h3>
            <p className="mb-4 text-sm text-slate-400">
              Add your first company to start tracking internships
            </p>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </CardContent>
        </Card>
      ) : !loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Link key={company.id} href={`/companies/${company.id}`}>
              <Card className="cursor-pointer transition-all hover:border-slate-700 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {company.logoUrl ? (
                        <img
                          src={company.logoUrl}
                          alt={company.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold">
                          {company.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-base">{company.name}</CardTitle>
                        <p className="mt-1 text-xs text-slate-400">
                          {company.stats.total} {company.stats.total === 1 ? 'opening' : 'openings'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                      <span className="text-slate-300">Applied: {company.stats.applied}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="h-3 w-3 text-yellow-500" />
                      <span className="text-slate-300">Pending: {company.stats.notApplied}</span>
                    </div>
                    {company.stats.interview > 0 && (
                      <div className="flex items-center gap-2 text-xs">
                        <Briefcase className="h-3 w-3 text-blue-500" />
                        <span className="text-slate-300">Interview: {company.stats.interview}</span>
                      </div>
                    )}
                    {company.stats.offer > 0 && (
                      <div className="flex items-center gap-2 text-xs">
                        <Award className="h-3 w-3 text-purple-500" />
                        <span className="text-slate-300">Offer: {company.stats.offer}</span>
                      </div>
                    )}
                    {company.stats.rejected > 0 && (
                      <div className="flex items-center gap-2 text-xs">
                        <XCircle className="h-3 w-3 text-red-500" />
                        <span className="text-slate-300">Rejected: {company.stats.rejected}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
