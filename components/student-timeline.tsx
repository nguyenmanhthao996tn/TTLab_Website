'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface Student {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  joinDate: string;
  leaveDate?: string;
}

interface StudentTimelineProps {
  students: Student[];
}

const FOUNDATION_YEAR = 2019;
const CURRENT_YEAR = 2026;
const TOTAL_YEARS = CURRENT_YEAR - FOUNDATION_YEAR;

export function StudentTimeline({ students }: StudentTimelineProps) {
  const sortedStudents = [...students].sort((a, b) => {
    const aJoin = parseInt(a.joinDate);
    const bJoin = parseInt(b.joinDate);
    return aJoin - bJoin;
  });

  const calculatePosition = (joinDate: string) => {
    const year = parseInt(joinDate);
    return ((year - FOUNDATION_YEAR) / TOTAL_YEARS) * 100;
  };

  const calculateBarWidth = (joinDate: string, leaveDate?: string) => {
    const join = parseInt(joinDate);
    const leave = leaveDate ? parseInt(leaveDate) : CURRENT_YEAR;
    const duration = leave - join;
    return (duration / TOTAL_YEARS) * 100;
  };

  const getYears = () => {
    const years = [];
    for (let i = FOUNDATION_YEAR; i <= CURRENT_YEAR; i++) {
      years.push(i);
    }
    return years;
  };

  return (
    <div className="w-full py-12">
      <div className="relative">
        {/* Central Timeline */}
        <div className="flex flex-col items-center">
          {/* Year markers */}
          <div className="w-full max-w-4xl mb-12">
            <div className="relative h-12">
              {getYears().map((year) => {
                const position = ((year - FOUNDATION_YEAR) / TOTAL_YEARS) * 100;
                return (
                  <div
                    key={year}
                    className="absolute flex flex-col items-center"
                    style={{ left: `${position}%` }}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mb-2"></div>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {year}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Horizontal line */}
            <div className="h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 rounded-full"></div>
          </div>

          {/* Students on zigzag */}
          <div className="w-full max-w-4xl space-y-8">
            {sortedStudents.map((student, index) => {
              const isLeft = index % 2 === 0;
              const position = calculatePosition(student.joinDate);
              const barWidth = calculateBarWidth(student.joinDate, student.leaveDate);
              const ref = useScrollAnimation();

              return (
                <div
                  key={student.id}
                  ref={ref}
                  className="opacity-0 translate-y-4 transition-all duration-500 relative"
                >
                  <div className="flex items-start gap-4" style={{ marginLeft: `${position}%` }}>
                    {/* Connection line and indicator */}
                    <div className="absolute -top-8 w-0.5 h-8 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="absolute -top-6 left-0 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-slate-900"></div>

                    {/* Timeline bar showing duration */}
                    <div
                      className="absolute -top-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                      style={{ width: `${barWidth}%` }}
                    ></div>

                    {/* Student Card */}
                    <div
                      className={`w-80 bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-4 ${
                        isLeft ? 'ml-0' : 'ml-auto'
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-400 to-purple-500 p-0.5">
                          <Image
                            src={student.image}
                            alt={student.name}
                            fill
                            className="object-cover rounded-full"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                            {student.name}
                          </h4>
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1 line-clamp-2">
                            {student.role}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">{student.joinDate}</span>
                            {student.leaveDate ? ` - ${student.leaveDate}` : ' - Present'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom marker for 2026 */}
          <div className="mt-12 text-center">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Founded in {FOUNDATION_YEAR}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
