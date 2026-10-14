import { vi, expect, test, describe } from "vitest";

// Mock the next/headers cookie store so 'await cookies()' does not crash
vi.mock("next/headers", () => ({
    cookies: () => ({
        getAll: () => [],
        setAll: () => { },
        set: () => { },
    }),
}));

import {
    createPatient,
    getPatient,
    updatePatient,
    getMostRecentPatient,
    deletePatient
} from "./crud";

describe("Supabase Patients CRUD Test Suite", () => {
    let testPatientId: number;

    test("createPatient() should insert data and return the created record", async () => {
        const { data, error } = await createPatient("Test-First", "Test-Last", "Test-Meds");

        expect(error).toBeNull();
        expect(data).toBeDefined();
        expect(data.firstName).toBe("Test-First");

        testPatientId = data.id; // Store ID for subsequent test steps
    });

    test("getPatient() should find a single record matching the exact ID", async () => {
        expect(testPatientId).toBeDefined();
        const { data, error } = await getPatient(testPatientId);

        expect(error).toBeNull();
        expect(data).toBeDefined();
        expect(data.id).toBe(testPatientId);
    });

    test("updatePatient() should modify partial field records cleanly", async () => {
        expect(testPatientId).toBeDefined();
        const { data, error } = await updatePatient(testPatientId, {
            firstName: "Updated-First"
        });

        expect(error).toBeNull();
        expect(data).toBeDefined();
        expect(data.firstName).toBe("Updated-First");
    });

    test("getMostRecentPatient() should retrieve the absolute newest record", async () => {
        const { data, error } = await getMostRecentPatient();

        expect(error).toBeNull();
        expect(data).toBeDefined();
        expect(data.id).toBe(testPatientId);
    });

    test("deletePatient() should successfully remove the row from the database", async () => {
        expect(testPatientId).toBeDefined();
        const { error } = await deletePatient(testPatientId);
        expect(error).toBeNull();

        const { data } = await getPatient(testPatientId);
        expect(data).toBeNull();
    });
});