import { prisma } from './prisma';

export interface CompanyWithStats {
  id: string;
  name: string;
  careersUrl: string;
  targetRoles: string;
  preferredLocation: string;
  logoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    internships: number;
  };
  stats: {
    total: number;
    notApplied: number;
    applied: number;
    interview: number;
    rejected: number;
    offer: number;
  };
}

export async function getAllCompanies(): Promise<CompanyWithStats[]> {
  const companies = await prisma.company.findMany({
    include: {
      internships: {
        include: {
          application: true,
        },
      },
      _count: {
        select: {
          internships: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return companies.map((company: any) => {
    const stats = {
      total: company.internships.length,
      notApplied: 0,
      applied: 0,
      interview: 0,
      rejected: 0,
      offer: 0,
    };

    company.internships.forEach((internship: any) => {
      const status = internship.application?.status || 'NOT_APPLIED';
      switch (status) {
        case 'NOT_APPLIED':
          stats.notApplied++;
          break;
        case 'APPLIED':
          stats.applied++;
          break;
        case 'INTERVIEW':
          stats.interview++;
          break;
        case 'REJECTED':
          stats.rejected++;
          break;
        case 'OFFER':
          stats.offer++;
          break;
      }
    });

    return {
      ...company,
      stats,
    };
  });
}

export async function getCompanyById(id: string) {
  return prisma.company.findUnique({
    where: { id },
    include: {
      internships: {
        include: {
          application: true,
        },
        orderBy: {
          dateFound: 'desc',
        },
      },
    },
  });
}

export async function createCompany(data: {
  name: string;
  careersUrl: string;
  targetRoles: string;
  preferredLocation?: string;
  logoUrl?: string;
}) {
  return prisma.company.create({
    data: {
      name: data.name,
      careersUrl: data.careersUrl,
      targetRoles: data.targetRoles,
      preferredLocation: data.preferredLocation || 'Mumbai, India',
      logoUrl: data.logoUrl,
    },
  });
}

export async function updateCompany(
  id: string,
  data: {
    name?: string;
    careersUrl?: string;
    targetRoles?: string;
    preferredLocation?: string;
    logoUrl?: string;
  }
) {
  return prisma.company.update({
    where: { id },
    data,
  });
}

export async function deleteCompany(id: string) {
  return prisma.company.delete({
    where: { id },
  });
}
