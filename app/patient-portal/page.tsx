"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PatientPortal.module.css";

export interface Patient {
  name: string;
  dob: string;
  mrn: string;
  provider: string;
  bloodType: string;
  allergies: string[];
}

export interface Vital {
  value: string;
  unit?: string;
}

export interface LabResult {
  id: number;
  testName: string;
  value: number;
  unit: string;
  minRange: number;
  maxRange: number;
  date: string;
}

export interface Appointment {
  id: number;
  dateTime: string;
  reason: string;
  provider: string;
  location: string;
}

export interface PortalData {
  patient: Patient;
  vitals: Record<string, Vital>;
  labs: LabResult[];
  appointments: Appointment[];
}

type LabStatus = "low" | "normal" | "high";

const INITIAL_DATA: PortalData = {
  patient: {
    name: "",
    dob: "",
    mrn: "",
    provider: "",
    bloodType: "",
    allergies: [],
  },
  vitals: {},
  labs: [],
  appointments: [],
};

const DEFAULT_VITALS = [
  { label: "Blood pressure", unit: "mmHg" },
  { label: "Heart rate", unit: "bpm" },
  { label: "Weight", unit: "lb" },
  { label: "Temperature", unit: "°F" },
  { label: "SpO₂", unit: "%" },
];

function getLabStatus(lab: LabResult): LabStatus {
  if (lab.value < lab.minRange) return "low";
  if (lab.value > lab.maxRange) return "high";
  return "normal";
}

function StatusBadge({ status }: { status: LabStatus }) {
  const statusMap = {
    normal: { label: "Normal", className: styles.tagOk },
    high: { label: "High", className: styles.tagBad },
    low: { label: "Low", className: styles.tagWarn },
  };

  const current = statusMap[status];
  return <span className={`${styles.tag} ${current.className}`}>{current.label}</span>;
}

export default function PatientPortal() {
  const [data, setData] = useState<PortalData>(INITIAL_DATA);
  const [theme, setTheme] = useState<"light" | "dark" | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPortalData() {
      try {
        // TODO: Replace with actual API call
        const response = INITIAL_DATA;
        if (isMounted) {
          setData(response);
        }
      } catch (err) {
        console.error("Failed to fetch portal data:", err);
      }
    }

    loadPortalData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleTheme = () => {
    if (!containerRef.current) return;
    const isCurrentlyDark = getComputedStyle(containerRef.current).colorScheme === "dark";
    setTheme(isCurrentlyDark ? "light" : "dark");
  };

  const { patient, vitals, labs, appointments } = data;
  const flaggedLabs = labs.filter((lab) => getLabStatus(lab) !== "normal");
  const nextAppointment = appointments[0];
  const firstName = patient.name ? patient.name.split(" ")[0] : "";

  return (
    <div ref={containerRef} className={styles.container} data-theme={theme}>
      <main className={`{styles.main} w-screen`}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>
              {firstName ? `Welcome back, ${firstName}` : "Patient Portal"}
            </h1>
            <p className={styles.subtitle}>Health summary and recent records</p>
          </div>
          <button type="button" onClick={handleToggleTheme} className={styles.themeBtn}>
            Toggle Theme
          </button>
        </header>

        <section className={styles.vitalsBar} aria-label="Recent Vitals">
          {DEFAULT_VITALS.map(({ label, unit }) => {
            const reading = vitals[label];
            return (
              <div key={label} className={styles.vitalItem}>
                <span className={styles.vitalLabel}>{label}</span>
                <strong className={styles.vitalValue}>{reading ? reading.value : "—"}</strong>
                <em className={styles.vitalUnit}>{reading?.unit ?? unit}</em>
              </div>
            );
          })}
        </section>

        <div className={styles.grid}>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Upcoming Appointment</h2>
            {nextAppointment ? (
              <div>
                <strong>{nextAppointment.reason}</strong>
                <div>{nextAppointment.dateTime}</div>
                <p className={styles.mutedText}>
                  {nextAppointment.provider} · {nextAppointment.location}
                </p>
              </div>
            ) : (
              <p className={styles.mutedText}>No upcoming visits scheduled.</p>
            )}
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Flagged Lab Results</h2>
            {flaggedLabs.length > 0 ? (
              flaggedLabs.map((lab) => (
                <div className={styles.row} key={lab.id}>
                  <div>
                    <div>{lab.testName}</div>
                    <span className={styles.mutedText}>
                      {lab.value} {lab.unit}
                    </span>
                  </div>
                  <StatusBadge status={getLabStatus(lab)} />
                </div>
              ))
            ) : (
              <p className={styles.mutedText}>No abnormal lab results.</p>
            )}
          </section>
        </div>

        <div className={styles.grid}>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Allergies</h2>
            {patient.allergies.length > 0 ? (
              <div>
                {patient.allergies.map((allergy) => (
                  <span key={allergy} className={`${styles.tag} ${styles.tagBad}`}>
                    {allergy}
                  </span>
                ))}
              </div>
            ) : (
              <p className={styles.mutedText}>No known allergies on file.</p>
            )}
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Primary Care Team</h2>
            {patient.provider ? (
              <div>
                <div>{patient.provider}</div>
                <p className={styles.mutedText}>
                  Primary Care Provider
                  {patient.bloodType ? ` · Blood Type: ${patient.bloodType}` : ""}
                </p>
              </div>
            ) : (
              <p className={styles.mutedText}>No primary care provider assigned.</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
