import { prisma } from './prisma';

export async function createInternship(data: {
  companyId: string;
  title: string;
  location: string;
  applyUrl: string;
  notes?: string;
  dateFound?: Date;
}) {
  const internship = await prisma.internship.create({
    data: {
      companyId: data.companyId,
      title: data.title,
      location: data.location,
      applyUrl: data.applyUrl,
      notes: data.notes,
      dateFound: data.dateFound || new Date(),
    },
    include: {
      company: true,
      application: true,
    },
  });

  // Auto-create application record with NOT_APPLIED status
  await prisma.application.create({
    data: {
      internshipId: internship.id,
      status: 'NOT_APPLIED',
    },
  });

  return prisma.internship.findUnique({
    where: { id: internship.id },
    include: {
      company: true,
      application: true,
    },
  });
}

export async function getInternshipById(id: string) {
  return prisma.internship.findUnique({
    where: { id },
    include: {
      company: true,
      application: true,
    },
  });
}

export async function updateInternship(
  id: string,
  data: {
    title?: string;
    location?: string;
    applyUrl?: string;
    notes?: string;
    dateFound?: Date;
  }
) {
  return prisma.internship.update({
    where: { id },
    data,
    include: {
      company: true,
      application: true,
    },
  });
}

export async function deleteInternship(id: string) {
  return prisma.internship.delete({
    where: { id },
  });
}

export async function getInternshipsByCompany(companyId: string) {
  return prisma.internship.findMany({
    where: { companyId },
    include: {
      application: true,
    },
    orderBy: {
      dateFound: 'desc',
    },
  });
}
