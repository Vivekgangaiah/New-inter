import { prisma } from './prisma';

export type ApplicationStatus = 'NOT_APPLIED' | 'APPLIED' | 'INTERVIEW' | 'REJECTED' | 'OFFER';

export async function getApplicationById(id: string) {
  return prisma.application.findUnique({
    where: { id },
    include: {
      internship: {
        include: {
          company: true,
        },
      },
    },
  });
}

export async function getApplicationByInternshipId(internshipId: string) {
  return prisma.application.findUnique({
    where: { internshipId },
    include: {
      internship: {
        include: {
          company: true,
        },
      },
    },
  });
}

export async function createApplication(data: {
  internshipId: string;
  status?: ApplicationStatus;
  resumeVersion?: string;
  referralDetails?: string;
  followUpDate?: Date;
  notes?: string;
}) {
  return prisma.application.create({
    data: {
      internshipId: data.internshipId,
      status: data.status || 'NOT_APPLIED',
      resumeVersion: data.resumeVersion,
      referralDetails: data.referralDetails,
      followUpDate: data.followUpDate,
      notes: data.notes,
    },
    include: {
      internship: {
        include: {
          company: true,
        },
      },
    },
  });
}

export async function updateApplication(
  id: string,
  data: {
    status?: ApplicationStatus;
    resumeVersion?: string;
    referralDetails?: string;
    followUpDate?: Date | null;
    notes?: string;
  }
) {
  return prisma.application.update({
    where: { id },
    data,
    include: {
      internship: {
        include: {
          company: true,
        },
      },
    },
  });
}

export async function deleteApplication(id: string) {
  return prisma.application.delete({
    where: { id },
  });
}

export async function getApplicationsByStatus(status: ApplicationStatus) {
  return prisma.application.findMany({
    where: { status },
    include: {
      internship: {
        include: {
          company: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
