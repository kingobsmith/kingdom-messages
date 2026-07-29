import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  category: string;
  statement: string;
  kingdomChamber: boolean;
  privateMessages: boolean;
  createdAt: string;
}

export interface CreateApplicationInput {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  category: string;
  statement: string;
  kingdomChamber: boolean;
  privateMessages: boolean;
}

const DATA_DIR = path.join(process.cwd(), "data");
const APPLICATIONS_FILE = path.join(DATA_DIR, "applications.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(APPLICATIONS_FILE)) {
    fs.writeFileSync(APPLICATIONS_FILE, "[]", "utf-8");
  }
}

function readApplications(): Application[] {
  ensureDataDir();
  const raw = fs.readFileSync(APPLICATIONS_FILE, "utf-8");
  return JSON.parse(raw) as Application[];
}

function writeApplications(applications: Application[]) {
  ensureDataDir();
  fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(applications, null, 2), "utf-8");
}

export function createApplication(input: CreateApplicationInput): Application {
  const applications = readApplications();
  const application: Application = {
    id: uuidv4(),
    ...input,
    createdAt: new Date().toISOString(),
  };
  applications.push(application);
  writeApplications(applications);
  return application;
}
