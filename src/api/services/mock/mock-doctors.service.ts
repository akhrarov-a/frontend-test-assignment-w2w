import { CreateUpdateDoctorDto } from '@api';

/**
 * Mock doctors from session
 */
const mockDoctorsFromSession = sessionStorage.getItem('mockDoctors')
  ? JSON.parse(sessionStorage.getItem('mockDoctors') as string)
  : null;

/**
 * Mock doctors
 */
let mockDoctors = mockDoctorsFromSession || [
  {
    id: 1,
    firstName: 'Иван',
    lastName: 'Иванов',
    surname: 'Иванович',
    department: 1,
    isHeadOfDepartment: true
  },
  {
    id: 2,
    firstName: 'Юрий',
    lastName: 'Дмитриев',
    surname: 'Иванович',
    department: 1,
    isHeadOfDepartment: false
  },
  {
    id: 3,
    firstName: 'Юлия',
    lastName: 'Дмитриева',
    surname: 'Ивановна',
    department: 1,
    isHeadOfDepartment: false
  },
  {
    id: 4,
    firstName: 'Анна',
    lastName: 'Андреева',
    surname: 'Ивановна',
    department: 2,
    isHeadOfDepartment: true
  },
  {
    id: 5,
    firstName: 'Алексей',
    lastName: 'Жуков',
    surname: 'Иванович',
    department: 2,
    isHeadOfDepartment: false
  },
  {
    id: 6,
    firstName: 'Александр',
    lastName: 'Смирнов',
    surname: 'Иванович',
    department: 2,
    isHeadOfDepartment: false
  }
];

/**
 * Mock doctors service
 */
class MockDoctorsService {
  /**
   * Get all doctors
   */
  static getAllDoctors = () => mockDoctors;

  /**
   * Get doctor by id
   */
  static getDoctorById = (id: number) =>
    mockDoctors.find((doctor: { id: number }) => doctor.id === id);

  /**
   * Create doctor
   */
  static createDoctor = (doctorDto: CreateUpdateDoctorDto) => {
    const newDoctor = {
      id: mockDoctors[mockDoctors.length - 1].id + 1,
      ...doctorDto
    };

    mockDoctors.push(newDoctor);

    sessionStorage.setItem('mockDoctors', JSON.stringify(mockDoctors));

    return { id: newDoctor.id };
  };

  /**
   * Update doctor
   */
  static updateDoctor = (id: number, doctorDto: CreateUpdateDoctorDto) => {
    const existingDoctor = mockDoctors.find(
      (doctor: { id: number }) => doctor.id === id
    );
    const isChangedHeadOfDepartment =
      doctorDto.isHeadOfDepartment &&
      doctorDto.isHeadOfDepartment !== existingDoctor.isHeadOfDepartment;

    if (!existingDoctor) return false;

    mockDoctors = mockDoctors.map(
      (doctor: { id: number; department: number }) => {
        if (doctor.id === id) {
          return { ...doctor, ...doctorDto };
        }

        if (
          isChangedHeadOfDepartment &&
          doctor.department === doctorDto.department
        ) {
          return { ...doctor, isHeadOfDepartment: false };
        }

        return doctor;
      }
    );

    sessionStorage.setItem('mockDoctors', JSON.stringify(mockDoctors));

    return true;
  };

  /**
   * Delete doctors by ids
   */
  static deleteDoctorsByIds = (ids: number[]) => {
    mockDoctors = mockDoctors.filter(
      (doctor: { id: number }) => !ids.includes(doctor.id)
    );

    sessionStorage.setItem('mockDoctors', JSON.stringify(mockDoctors));
  };
}

export { MockDoctorsService };
