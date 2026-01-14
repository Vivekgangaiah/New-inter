'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Plus,
  ExternalLink,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  FileText,
} from 'lucide-react';
type ApplicationStatus = 'NOT_APPLIED' | 'APPLIED' | 'INTERVIEW' | 'REJECTED' | 'OFFER';

interface Internship {
  id: string;
  title: string;
  location: string;
  dateFound: string;
  applyUrl: string;
  notes?: string;
  application?: {
    id: string;
    status: ApplicationStatus;
    resumeVersion?: string;
    referralDetails?: string;
    followUpDate?: string;
    notes?: string;
  };
}

interface Company {
  id: string;
  name: string;
  careersUrl: string;
  targetRoles: string;
  preferredLocation: string;
  logoUrl?: string;
  internships: Internship[];
}

export default function CompanyPage() {
  const params = useParams();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchCompany = async () => {
    try {
      const res = await fetch(`/api/companies/${params.id}`);
      const data = await res.json();
      setCompany(data);
    } catch (error) {
      console.error('Error fetching company:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddInternship = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      companyId: params.id as string,
      title: formData.get('title') as string,
      location: formData.get('location') as string,
      applyUrl: formData.get('applyUrl') as string,
      notes: formData.get('notes') as string || undefined,
    };

    try {
      const res = await fetch('/api/internships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setShowAddModal(false);
        fetchCompany();
        e.currentTarget.reset();
      }
    } catch (error) {
      console.error('Error adding internship:', error);
    }
  };

  const handleUpdateApplication = async (applicationId: string, updates: any) => {
    try {
      const res = await fetch(`/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        fetchCompany();
      }
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const handleDeleteInternship = async (id: string) => {
    if (!confirm('Are you sure you want to delete this internship?')) return;

    try {
      const res = await fetch(`/api/internships/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchCompany();
      }
    } catch (error) {
      console.error('Error deleting internship:', error);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchCompany();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const statusColors: Record<ApplicationStatus, string> = {
    NOT_APPLIED: 'bg-slate-700 text-slate-300',
    APPLIED: 'bg-blue-600 text-white',
    INTERVIEW: 'bg-yellow-600 text-white',
    REJECTED: 'bg-red-600 text-white',
    OFFER: 'bg-green-600 text-white',
  };

  const statusLabels: Record<ApplicationStatus, string> = {
    NOT_APPLIED: 'Not Applied',
    APPLIED: 'Applied',
    INTERVIEW: 'Interview',
    REJECTED: 'Rejected',
    OFFER: 'Offer',
  };

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center py-12">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-12">
        <p className="mb-4 text-slate-400">Company not found</p>
        <Link href="/">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {company.logoUrl ? (
              <img
                src={company.logoUrl}
                alt={company.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600 text-2xl font-bold">
                {company.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">{company.name}</h1>
              <p className="mt-1 text-sm text-slate-400">{company.targetRoles}</p>
            </div>
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Internship
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Company Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-400">Careers Page</label>
                <a
                  href={company.careersUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                >
                  Visit Careers Page
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400">Preferred Location</label>
                <p className="mt-1 text-sm">{company.preferredLocation}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400">Target Roles</label>
                <p className="mt-1 text-sm">{company.targetRoles}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Internship Openings ({company.internships.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {company.internships.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-400">
                  No internships added yet. Click &quot;Add Internship&quot; to get started.
                </div>
              ) : (
                <div className="space-y-2">
                  {company.internships.map((internship) => (
                    <div
                      key={internship.id}
                      className="group rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-slate-700"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{internship.title}</h3>
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs ${
                                statusColors[internship.application?.status || 'NOT_APPLIED']
                              }`}
                            >
                              {statusLabels[internship.application?.status || 'NOT_APPLIED']}
                            </span>
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {internship.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(internship.dateFound).toLocaleDateString()}
                            </span>
                          </div>
                          {internship.notes && (
                            <p className="mt-2 text-xs text-slate-400">{internship.notes}</p>
                          )}
                        </div>
                        <div className="ml-4 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <select
                            value={internship.application?.status || 'NOT_APPLIED'}
                            onChange={(e) => {
                              if (internship.application) {
                                handleUpdateApplication(internship.application.id, {
                                  status: e.target.value,
                                });
                              }
                            }}
                            className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-xs"
                          >
                            <option value="NOT_APPLIED">Not Applied</option>
                            <option value="APPLIED">Applied</option>
                            <option value="INTERVIEW">Interview</option>
                            <option value="REJECTED">Rejected</option>
                            <option value="OFFER">Offer</option>
                          </select>
                          <a
                            href={internship.applyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md border border-slate-700 bg-slate-800 p-1.5 hover:bg-slate-700"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <button
                            onClick={() => {
                              setSelectedInternship(internship);
                              setShowEditModal(true);
                            }}
                            className="rounded-md border border-slate-700 bg-slate-800 p-1.5 hover:bg-slate-700"
                          >
                            <Edit className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteInternship(internship.id)}
                            className="rounded-md border border-red-800 bg-red-900/20 p-1.5 hover:bg-red-900/40"
                          >
                            <Trash2 className="h-3 w-3 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add Internship</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddInternship} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Role Title *</label>
                  <input
                    name="title"
                    required
                    className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Location *</label>
                  <input
                    name="location"
                    required
                    className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Apply URL *</label>
                  <input
                    name="applyUrl"
                    type="url"
                    required
                    className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Notes</label>
                  <textarea
                    name="notes"
                    rows={3}
                    className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">Add Internship</Button>
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

      {showEditModal && selectedInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Edit Internship & Application</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const internshipUpdates: any = {};
                  const applicationUpdates: any = {};

                  if (formData.get('title')) internshipUpdates.title = formData.get('title');
                  if (formData.get('location'))
                    internshipUpdates.location = formData.get('location');
                  if (formData.get('applyUrl'))
                    internshipUpdates.applyUrl = formData.get('applyUrl');
                  if (formData.get('internshipNotes'))
                    internshipUpdates.notes = formData.get('internshipNotes');

                  if (formData.get('status'))
                    applicationUpdates.status = formData.get('status');
                  if (formData.get('resumeVersion'))
                    applicationUpdates.resumeVersion = formData.get('resumeVersion');
                  if (formData.get('referralDetails'))
                    applicationUpdates.referralDetails = formData.get('referralDetails');
                  if (formData.get('followUpDate'))
                    applicationUpdates.followUpDate = formData.get('followUpDate')
                      ? new Date(formData.get('followUpDate') as string).toISOString()
                      : null;
                  if (formData.get('applicationNotes'))
                    applicationUpdates.notes = formData.get('applicationNotes');

                  try {
                    if (Object.keys(internshipUpdates).length > 0) {
                      await fetch(`/api/internships/${selectedInternship.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(internshipUpdates),
                      });
                    }

                    if (
                      selectedInternship.application &&
                      Object.keys(applicationUpdates).length > 0
                    ) {
                      await fetch(`/api/applications/${selectedInternship.application.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(applicationUpdates),
                      });
                    }

                    setShowEditModal(false);
                    setSelectedInternship(null);
                    fetchCompany();
                  } catch (error) {
                    console.error('Error updating:', error);
                  }
                }}
                className="space-y-6"
              >
                <div>
                  <h3 className="mb-3 text-sm font-semibold">Internship Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium">Title</label>
                      <input
                        name="title"
                        defaultValue={selectedInternship.title}
                        className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Location</label>
                      <input
                        name="location"
                        defaultValue={selectedInternship.location}
                        className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Apply URL</label>
                      <input
                        name="applyUrl"
                        type="url"
                        defaultValue={selectedInternship.applyUrl}
                        className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Notes</label>
                      <textarea
                        name="internshipNotes"
                        rows={3}
                        defaultValue={selectedInternship.notes || ''}
                        className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold">Application Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium">Status</label>
                      <select
                        name="status"
                        defaultValue={selectedInternship.application?.status || 'NOT_APPLIED'}
                        className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                      >
                        <option value="NOT_APPLIED">Not Applied</option>
                        <option value="APPLIED">Applied</option>
                        <option value="INTERVIEW">Interview</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="OFFER">Offer</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Resume Version</label>
                      <input
                        name="resumeVersion"
                        defaultValue={selectedInternship.application?.resumeVersion || ''}
                        placeholder="e.g., v2.1"
                        className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Referral Details</label>
                      <textarea
                        name="referralDetails"
                        rows={2}
                        defaultValue={selectedInternship.application?.referralDetails || ''}
                        className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Follow-up Date</label>
                      <input
                        name="followUpDate"
                        type="date"
                        defaultValue={
                          selectedInternship.application?.followUpDate
                            ? new Date(selectedInternship.application.followUpDate)
                                .toISOString()
                                .split('T')[0]
                            : ''
                        }
                        className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">Application Notes</label>
                      <textarea
                        name="applicationNotes"
                        rows={3}
                        defaultValue={selectedInternship.application?.notes || ''}
                        className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">Save Changes</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedInternship(null);
                    }}
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
    </div>
  );
}
