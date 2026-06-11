"use client";

export interface Business {
  name: string;
  owner: string;
  description: string;
  location: string;
  tags: string[];
  isVerified: boolean;
  status?: "active" | "suspended";
  phone?: string;
}

const DEFAULT_BUSINESSES: Business[] = [
  {
    name: "Sterling Legal Partners",
    owner: "Chief Adekunle Williams",
    description:
      "Premium legal consulting, corporate advisory, and dispute resolution services for enterprise clients and individuals.",
    location: "Ikoyi, Lagos",
    tags: ["Legal", "Consulting", "B2B"],
    isVerified: true,
    phone: "+234 801 234 5678",
  },
  {
    name: "TechNova Solutions Ltd",
    owner: "Mr. Chukwudi Eze",
    description:
      "End-to-end software development, IT infrastructure setup, and digital transformation consulting.",
    location: "Victoria Island, Lagos",
    tags: ["Technology", "IT Services", "B2B"],
    isVerified: true,
    phone: "+234 802 345 6789",
  },
  {
    name: "Island Prime Properties",
    owner: "Mrs. Folashade Ojo",
    description:
      "Luxury real estate brokerage, property management, and investment advisory on the Island.",
    location: "Lekki Phase 1, Lagos",
    tags: ["Real Estate", "Sales", "Management"],
    isVerified: false,
    phone: "+234 803 456 7890",
  },
  {
    name: "HealthPlus Diagnostics",
    owner: "Dr. Ibrahim Musa",
    description:
      "State-of-the-art medical laboratory and diagnostic center providing fast and accurate test results.",
    location: "Surulere, Lagos",
    tags: ["Healthcare", "Medical", "B2C"],
    isVerified: true,
    phone: "+234 804 567 8901",
  },
  {
    name: "Global Trade & Logistics",
    owner: "Alhaji Sani Danjuma",
    description:
      "International freight forwarding, customs clearance, and supply chain management services.",
    location: "Apapa, Lagos",
    tags: ["Logistics", "Import/Export", "B2B"],
    isVerified: false,
    phone: "+234 805 678 9012",
  },
];

export const isClient = typeof window !== "undefined";

export function getBusinesses(): Business[] {
  if (!isClient) return DEFAULT_BUSINESSES;
  
  const stored = localStorage.getItem("iasc_businesses");
  if (!stored) {
    localStorage.setItem("iasc_businesses", JSON.stringify(DEFAULT_BUSINESSES));
    return DEFAULT_BUSINESSES;
  }
  
  try {
    const parsed: Business[] = JSON.parse(stored);
    
    // Patch existing businesses with default phone numbers if they are missing
    const patched = parsed.map(b => {
      if (!b.phone) {
        const defaultMatch = DEFAULT_BUSINESSES.find(db => db.name === b.name);
        if (defaultMatch && defaultMatch.phone) {
          return { ...b, phone: defaultMatch.phone };
        }
      }
      return b;
    });
    
    // Save patched version back to keep it updated
    if (JSON.stringify(parsed) !== JSON.stringify(patched)) {
      localStorage.setItem("iasc_businesses", JSON.stringify(patched));
    }
    
    return patched;
  } catch (e) {
    console.error("Failed to parse businesses from storage", e);
    return DEFAULT_BUSINESSES;
  }
}

export function saveBusinesses(businesses: Business[]) {
  if (!isClient) return;
  localStorage.setItem("iasc_businesses", JSON.stringify(businesses));
}

export function addBusiness(business: Business): boolean {
  const businesses = getBusinesses();
  // Simple check for duplicates by name
  if (businesses.some(b => b.name.toLowerCase() === business.name.toLowerCase())) {
    return false;
  }
  businesses.unshift(business); // Add new business to the top
  saveBusinesses(businesses);
  // Dispatch an event so other components know data changed
  if (isClient) {
    window.dispatchEvent(new Event("businesses-updated"));
  }
  return true;
}

export function deleteBusiness(name: string): void {
  const businesses = getBusinesses();
  const filtered = businesses.filter(b => b.name.toLowerCase() !== name.toLowerCase());
  saveBusinesses(filtered);
  if (isClient) {
    window.dispatchEvent(new Event("businesses-updated"));
  }
}

export function toggleSuspendBusiness(name: string): void {
  const businesses = getBusinesses();
  const target = businesses.find(b => b.name.toLowerCase() === name.toLowerCase());
  if (target) {
    target.status = target.status === "suspended" ? "active" : "suspended";
    saveBusinesses(businesses);
    if (isClient) {
      window.dispatchEvent(new Event("businesses-updated"));
    }
  }
}
