import { useState } from "react";
import {
  Users, Package, Droplets, Phone, Heart, Award, BarChart3,
  Home, Menu, X, ChevronRight, Plus, Search, Bell, LogOut,
  Star, Trophy, Leaf, Trash2, Clock, CheckCircle, AlertCircle,
  MapPin, PhoneCall, Ambulance, Shield, Flame, Building2,
  Baby, UserCheck, Upload, Calendar, Filter, TrendingUp,
  Activity, Target, Gift, Zap, ArrowUp, ArrowDown, Eye
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

// ─── types ───────────────────────────────────────────────────────────────────
type Module =
  | "dashboard" | "users" | "food" | "blood" | "emergency"
  | "volunteer" | "rewards" | "reports";

// ─── mock data ────────────────────────────────────────────────────────────────
const donationData = [
  { month: "Jan", meals: 420, donors: 38 },
  { month: "Feb", meals: 580, donors: 52 },
  { month: "Mar", meals: 740, donors: 61 },
  { month: "Apr", meals: 690, donors: 55 },
  { month: "May", meals: 920, donors: 78 },
  { month: "Jun", meals: 1080, donors: 94 },
];

const impactData = [
  { name: "Meals Donated", value: 4430, color: "#16a34a" },
  { name: "Blood Units", value: 312, color: "#0ea5e9" },
  { name: "Trees Planted", value: 875, color: "#06b6d4" },
  { name: "Vol. Hours", value: 2340, color: "#f59e0b" },
];

const bloodDonors = [
  { name: "Arjun Sharma", blood: "O+", city: "Mumbai", status: "available", phone: "+91 98765 43210", lastDonated: "2024-03-12" },
  { name: "Priya Nair", blood: "A+", city: "Pune", status: "available", phone: "+91 87654 32109", lastDonated: "2024-02-28" },
  { name: "Rahul Gupta", blood: "B-", city: "Mumbai", status: "unavailable", phone: "+91 76543 21098", lastDonated: "2024-04-01" },
  { name: "Sneha Patel", blood: "AB+", city: "Thane", status: "available", phone: "+91 65432 10987", lastDonated: "2024-01-15" },
  { name: "Kiran Reddy", blood: "O-", city: "Nashik", status: "available", phone: "+91 54321 09876", lastDonated: "2024-03-30" },
  { name: "Meera Joshi", blood: "A-", city: "Pune", status: "unavailable", phone: "+91 43210 98765", lastDonated: "2024-04-10" },
];

const foodDonations = [
  { id: "FD001", donor: "Ramesh Caterers", item: "Cooked Rice & Dal", qty: "50 kg", expiry: "2026-06-25", status: "pending", pickup: "Andheri East" },
  { id: "FD002", donor: "Sunrise Bakery", item: "Bread & Biscuits", qty: "30 packs", expiry: "2026-06-27", status: "accepted", pickup: "Dadar West" },
  { id: "FD003", donor: "Hotel Spice Garden", item: "Mixed Veg Curry", qty: "80 portions", expiry: "2026-06-25", status: "picked", pickup: "Bandra" },
  { id: "FD004", donor: "Green Valley Farm", item: "Fresh Vegetables", qty: "100 kg", expiry: "2026-06-28", status: "delivered", pickup: "Vashi" },
  { id: "FD005", donor: "Anjali Home Kitchen", item: "Chapati & Sabzi", qty: "40 portions", expiry: "2026-06-25", status: "pending", pickup: "Chembur" },
];

const emergencyContacts = [
  { category: "Ambulance", icon: Ambulance, color: "text-red-500 bg-red-50", items: [
    { name: "National Ambulance", number: "108", area: "Pan India" },
    { name: "Mumbai Ambulance", number: "022-2621-5555", area: "Mumbai" },
    { name: "1298 Ziqitza", number: "1298", area: "Maharashtra" },
  ]},
  { category: "Police", icon: Shield, color: "text-blue-600 bg-blue-50", items: [
    { name: "National Emergency", number: "112", area: "Pan India" },
    { name: "Mumbai Police", number: "100", area: "Mumbai" },
    { name: "Women Helpline", number: "1091", area: "Pan India" },
  ]},
  { category: "Fire Service", icon: Flame, color: "text-orange-500 bg-orange-50", items: [
    { name: "Fire Emergency", number: "101", area: "Pan India" },
    { name: "Mumbai Fire", number: "022-2308-9200", area: "Mumbai" },
  ]},
  { category: "Hospitals", icon: Building2, color: "text-green-600 bg-green-50", items: [
    { name: "KEM Hospital", number: "022-2410-7000", area: "Parel, Mumbai" },
    { name: "Nair Hospital", number: "022-2308-0000", area: "Byculla, Mumbai" },
    { name: "Sion Hospital", number: "022-2408-3000", area: "Sion, Mumbai" },
  ]},
  { category: "Child Helpline", icon: Baby, color: "text-purple-500 bg-purple-50", items: [
    { name: "Childline India", number: "1098", area: "Pan India" },
    { name: "NCPCR", number: "1800-121-2830", area: "Pan India" },
  ]},
  { category: "Women Helpline", icon: UserCheck, color: "text-pink-500 bg-pink-50", items: [
    { name: "Women Helpline", number: "1091", area: "Pan India" },
    { name: "Domestic Violence", number: "181", area: "Pan India" },
    { name: "NCW Helpline", number: "7827170170", area: "Pan India" },
  ]},
];

const volunteerTasks = [
  { id: 1, title: "Feed Needy People", icon: Heart, desc: "Distribute food packets at railway stations and bus stops", points: 50, category: "Food", enrolled: 124, status: "active" },
  { id: 2, title: "Plant Trees Drive", icon: Leaf, desc: "Join the weekend tree plantation drive at Sanjay Gandhi Park", points: 75, category: "Environment", enrolled: 89, status: "active" },
  { id: 3, title: "Plastic-Free Challenge", icon: Trash2, desc: "30-day challenge to eliminate single-use plastics from daily life", points: 100, category: "Environment", enrolled: 203, status: "active" },
  { id: 4, title: "Community Clean-Up", icon: Users, desc: "Monthly neighborhood cleanliness drive", points: 60, category: "Community", enrolled: 156, status: "active" },
  { id: 5, title: "Teach Digital Literacy", icon: Zap, desc: "Teach smartphone basics to elderly citizens", points: 80, category: "Education", enrolled: 45, status: "upcoming" },
  { id: 6, title: "Blood Camp Volunteer", icon: Droplets, desc: "Assist at monthly blood donation camps as a coordinator", points: 90, category: "Health", enrolled: 67, status: "active" },
];

const leaderboard = [
  { rank: 1, name: "Ananya Krishnan", points: 2840, badges: 12, level: "Champion", avatar: "AK" },
  { rank: 2, name: "Vikram Mehta", points: 2610, badges: 10, level: "Champion", avatar: "VM" },
  { rank: 3, name: "Divya Iyer", points: 2390, badges: 9, level: "Hero", avatar: "DI" },
  { rank: 4, name: "Rohit Desai", points: 2150, badges: 8, level: "Hero", avatar: "RD" },
  { rank: 5, name: "Fatima Sheikh", points: 1980, badges: 7, level: "Leader", avatar: "FS" },
  { rank: 6, name: "Suresh Kumar", points: 1740, badges: 6, level: "Leader", avatar: "SK" },
  { rank: 7, name: "Pooja Agarwal", points: 1520, badges: 5, level: "Contributor", avatar: "PA" },
  { rank: 8, name: "Nikhil Bose", points: 1310, badges: 4, level: "Contributor", avatar: "NB" },
];

const users = [
  { id: "U001", name: "Arjun Sharma", email: "arjun@email.com", role: "Volunteer", joined: "2024-01-15", status: "active" },
  { id: "U002", name: "Priya NGO Trust", email: "priya.ngo@trust.org", role: "NGO", joined: "2024-02-03", status: "active" },
  { id: "U003", name: "Rahul Admin", email: "rahul@admin.com", role: "Admin", joined: "2023-11-20", status: "active" },
  { id: "U004", name: "Sneha Patel", email: "sneha@email.com", role: "User", joined: "2024-03-10", status: "active" },
  { id: "U005", name: "Kiran Reddy", email: "kiran@email.com", role: "Volunteer", joined: "2024-04-01", status: "inactive" },
  { id: "U006", name: "Meera Foundation", email: "info@meera.org", role: "NGO", joined: "2024-01-28", status: "active" },
];

// ─── component helpers ────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, color }: { label: string; value: string; sub: string; icon: any; color: string }) {
  return (
    <div className="bg-card rounded-2xl p-5 border border-border flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">{label}</p>
        <p className="text-foreground text-2xl font-bold mt-0.5">{value}</p>
        <p className="text-muted-foreground text-xs mt-1">{sub}</p>
      </div>
    </div>
  );
}

function Badge({ text, variant }: { text: string; variant: "green" | "blue" | "amber" | "red" | "gray" }) {
  const cls = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
    gray: "bg-gray-100 text-gray-600",
  }[variant];
  return <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${cls}`}>{text}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: "green" | "blue" | "amber" | "red" | "gray" }> = {
    pending: { label: "Pending", variant: "amber" },
    accepted: { label: "Accepted", variant: "blue" },
    picked: { label: "Picked Up", variant: "green" },
    delivered: { label: "Delivered", variant: "green" },
    active: { label: "Active", variant: "green" },
    inactive: { label: "Inactive", variant: "gray" },
    available: { label: "Available", variant: "green" },
    unavailable: { label: "Unavailable", variant: "red" },
    upcoming: { label: "Upcoming", variant: "blue" },
  };
  const { label, variant } = map[status] ?? { label: status, variant: "gray" as const };
  return <Badge text={label} variant={variant} />;
}

// ─── module views ─────────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <div className="space-y-8">
      {/* welcome */}
      <div className="rounded-2xl overflow-hidden relative bg-gradient-to-br from-green-600 via-green-500 to-cyan-500 p-8 text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #fff 0%, transparent 60%)" }} />
        <div className="relative">
          <p className="text-green-100 text-sm font-medium uppercase tracking-widest mb-1">Welcome back</p>
          <h1 className="text-3xl font-bold">WE HUMANS</h1>
          <p className="text-green-100 mt-2 max-w-xl">A compassionate platform for food, blood, emergency support, and volunteer action — helping people help people across India.</p>
          <div className="flex gap-3 mt-5 flex-wrap">
            <button className="bg-white text-green-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-50 transition-colors">Donate Food</button>
            <button className="bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-white/30 transition-colors border border-white/30">Find Blood Donor</button>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Meals Donated" value="4,430" sub="+12% this month" icon={Package} color="bg-green-100 text-green-600" />
        <StatCard label="Blood Donors" value="312" sub="48 new this month" icon={Droplets} color="bg-blue-100 text-blue-600" />
        <StatCard label="Trees Planted" value="875" sub="Goal: 1,000" icon={Leaf} color="bg-cyan-100 text-cyan-600" />
        <StatCard label="Volunteers" value="1,240" sub="Active this week: 89" icon={Users} color="bg-amber-100 text-amber-600" />
      </div>

      {/* charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-foreground">Monthly Meal Donations</h3>
            <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">2026</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={donationData}>
              <defs>
                <linearGradient id="gMeals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(22,163,74,0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#4a7560" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#4a7560" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid rgba(22,163,74,0.2)", fontSize: 12 }} />
              <Area type="monotone" dataKey="meals" stroke="#16a34a" strokeWidth={2.5} fill="url(#gMeals)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-5">Impact Breakdown</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={impactData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {impactData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {impactData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="font-semibold text-foreground">{d.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* recent activity */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-semibold text-foreground mb-4">Recent Donations</h3>
        <div className="space-y-3">
          {foodDonations.slice(0, 4).map((d) => (
            <div key={d.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <Package size={16} className="text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{d.donor}</p>
                <p className="text-xs text-muted-foreground">{d.item} · {d.qty}</p>
              </div>
              <StatusBadge status={d.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserManagement() {
  const [roleFilter, setRoleFilter] = useState("All");
  const roles = ["All", "User", "Volunteer", "NGO", "Admin"];
  const filtered = roleFilter === "All" ? users : users.filter((u) => u.role === roleFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">User Management</h2>
          <p className="text-muted-foreground text-sm">Manage users, roles, and permissions</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
          <Plus size={16} /> Add User
        </button>
      </div>

      {/* role filters */}
      <div className="flex gap-2 flex-wrap">
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setRoleFilter(r)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              roleFilter === r ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* registration form */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">Register New User</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Full Name", ph: "Enter full name" },
            { label: "Email Address", ph: "user@example.com" },
            { label: "Phone Number", ph: "+91 XXXXX XXXXX" },
            { label: "City", ph: "Enter city" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">{f.label}</label>
              <input className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" placeholder={f.ph} />
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Role</label>
            <select className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition">
              {["User", "Volunteer", "NGO", "Admin"].map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Password</label>
            <input type="password" className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition" placeholder="••••••••" />
          </div>
        </div>
        <button className="mt-4 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
          Create Account
        </button>
      </div>

      {/* user table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input className="w-full bg-input-background border border-border rounded-xl pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Search users…" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                {["ID", "Name", "Email", "Role", "Joined", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={u.id} className={`border-t border-border hover:bg-muted/30 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{u.id}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{u.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3">
                    <Badge text={u.role} variant={u.role === "Admin" ? "red" : u.role === "NGO" ? "blue" : u.role === "Volunteer" ? "green" : "gray"} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{u.joined}</td>
                  <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-primary font-semibold hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FoodDonation() {
  const [tab, setTab] = useState<"list" | "create">("list");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Food Donation</h2>
          <p className="text-muted-foreground text-sm">Manage food donations and pickup requests</p>
        </div>
        <div className="flex gap-2">
          {(["list", "create"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                tab === t ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:border-primary"
              }`}
            >
              {t === "list" ? "All Donations" : "Create Donation"}
            </button>
          ))}
        </div>
      </div>

      {/* stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Pending", val: "8", color: "text-amber-600 bg-amber-50" },
          { label: "Accepted", val: "14", color: "text-blue-600 bg-blue-50" },
          { label: "Picked Up", val: "23", color: "text-cyan-600 bg-cyan-50" },
          { label: "Delivered", val: "97", color: "text-green-600 bg-green-50" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className={`text-2xl font-bold ${s.color.split(" ")[0]}`}>{s.val}</div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {tab === "create" ? (
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-5">Create Food Donation Request</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Donor / Organization Name</label>
              <input className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Hotel / Individual / Caterer name" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Food Item Description</label>
              <input className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="e.g. Cooked Rice & Dal" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Quantity</label>
              <input className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="e.g. 50 kg / 80 portions" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Expiry / Best Before</label>
              <input type="date" className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Pickup Address</label>
              <input className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Full pickup address" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Preferred Pickup Time</label>
              <input type="time" className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Upload Food Images</label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors">
                <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Drag & drop or <span className="text-primary font-semibold">browse files</span></p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB each</p>
              </div>
            </div>
          </div>
          <button className="mt-5 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
            Submit Donation Request
          </button>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="flex-1 relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input className="w-full bg-input-background border border-border rounded-xl pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Search donations…" />
            </div>
            <button className="flex items-center gap-1.5 text-sm text-muted-foreground border border-border px-3 py-2 rounded-xl hover:border-primary hover:text-primary transition-colors">
              <Filter size={14} /> Filter
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  {["ID", "Donor", "Food Item", "Quantity", "Expiry", "Pickup Location", "Status", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {foodDonations.map((d, i) => (
                  <tr key={d.id} className={`border-t border-border hover:bg-muted/30 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{d.id}</td>
                    <td className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">{d.donor}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.item}</td>
                    <td className="px-4 py-3 text-foreground font-medium">{d.qty}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{d.expiry}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                      <span className="flex items-center gap-1"><MapPin size={11} />{d.pickup}</span>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                    <td className="px-4 py-3 flex gap-2">
                      <button className="text-xs text-primary font-semibold hover:underline">Accept</button>
                      <button className="text-xs text-muted-foreground hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function BloodDonorNetwork() {
  const [search, setSearch] = useState("");
  const [bgFilter, setBgFilter] = useState("All");
  const groups = ["All", "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const filtered = bloodDonors.filter((d) =>
    (bgFilter === "All" || d.blood === bgFilter) &&
    (search === "" || d.name.toLowerCase().includes(search.toLowerCase()) || d.city.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Blood Donor Network</h2>
          <p className="text-muted-foreground text-sm">Search donors and manage blood requests</p>
        </div>
        <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors">
          <AlertCircle size={16} /> Emergency Request
        </button>
      </div>

      {/* blood group filter */}
      <div className="flex gap-2 flex-wrap">
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => setBgFilter(g)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              bgFilter === g ? "bg-red-500 text-white" : "bg-card border border-border text-muted-foreground hover:border-red-400 hover:text-red-500"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card border border-border rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="Search by name or city…"
        />
      </div>

      {/* donor cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((d) => (
          <div key={d.name} className="bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-bold text-sm">{d.blood}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{d.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin size={10} />{d.city}</p>
                </div>
              </div>
              <StatusBadge status={d.status} />
            </div>
            <div className="text-xs text-muted-foreground space-y-1 pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <PhoneCall size={12} />
                <span>{d.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={12} />
                <span>Last donated: {d.lastDonated}</span>
              </div>
            </div>
            <button className="mt-3 w-full text-center text-xs font-semibold text-red-500 border border-red-200 rounded-xl py-2 hover:bg-red-50 transition-colors">
              Contact Donor
            </button>
          </div>
        ))}
      </div>

      {/* register form */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">Register as Blood Donor</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Full Name</label>
            <input className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your name" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Blood Group</label>
            <select className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">City</label>
            <input className="w-full bg-input-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your city" />
          </div>
        </div>
        <button className="mt-4 bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors">
          Register as Donor
        </button>
      </div>
    </div>
  );
}

function EmergencyHub() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Emergency Hub</h2>
        <p className="text-muted-foreground text-sm">Quick access to emergency contacts and helplines</p>
      </div>

      {/* SOS banner */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center shrink-0">
          <Phone size={26} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-red-700 text-lg">SOS Emergency: 112</p>
          <p className="text-red-600 text-sm">Available 24×7 · Pan India · Free Call</p>
        </div>
        <a href="tel:112" className="bg-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-600 transition-colors">Call Now</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {emergencyContacts.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.category} className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cat.color}`}>
                  <Icon size={18} />
                </div>
                <h3 className="font-bold text-foreground">{cat.category}</h3>
              </div>
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors group">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin size={10} />{item.area}</p>
                    </div>
                    <a href={`tel:${item.number}`} className="flex items-center gap-2 text-sm font-bold text-primary group-hover:text-green-700 transition-colors">
                      <PhoneCall size={14} />
                      {item.number}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VolunteerTasks() {
  const [enrolled, setEnrolled] = useState<number[]>([]);
  const toggle = (id: number) => setEnrolled((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Volunteer Tasks</h2>
          <p className="text-muted-foreground text-sm">Join activities and earn reward points</p>
        </div>
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-bold">
          {enrolled.length} tasks enrolled
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {volunteerTasks.map((task) => {
          const Icon = task.icon;
          const isEnrolled = enrolled.includes(task.id);
          return (
            <div key={task.id} className={`bg-card rounded-2xl border-2 p-5 transition-all ${isEnrolled ? "border-primary shadow-md shadow-green-100" : "border-border hover:shadow-md"}`}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-foreground text-sm">{task.title}</h3>
                    <StatusBadge status={task.status} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{task.desc}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Star size={11} className="text-amber-500" />{task.points} pts</span>
                    <span className="flex items-center gap-1"><Users size={11} />{task.enrolled} enrolled</span>
                    <Badge text={task.category} variant="blue" />
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggle(task.id)}
                className={`mt-4 w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isEnrolled
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-muted text-foreground hover:bg-green-100 hover:text-green-700 border border-border"
                }`}
              >
                {isEnrolled ? <span className="flex items-center justify-center gap-2"><CheckCircle size={14} /> Enrolled</span> : "Enroll Now"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RewardsSystem() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Rewards & Recognition</h2>
        <p className="text-muted-foreground text-sm">Points, badges, achievements, and leaderboard</p>
      </div>

      {/* user card */}
      <div className="bg-gradient-to-br from-green-600 to-cyan-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold">AS</div>
          <div>
            <p className="text-green-100 text-xs font-medium">Your Profile</p>
            <h3 className="text-xl font-bold">Arjun Sharma</h3>
            <p className="text-green-100 text-sm">Hero Level · 1,840 points</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-5xl font-bold">7</p>
            <p className="text-green-100 text-xs">Badges earned</p>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex justify-between text-xs text-green-100 mb-1.5">
            <span>Progress to Champion (2,000 pts)</span>
            <span>92%</span>
          </div>
          <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: "92%" }} />
          </div>
        </div>
      </div>

      {/* badges */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">Achievement Badges</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {[
            { icon: "🍱", label: "First Meal", earned: true },
            { icon: "🩸", label: "Life Saver", earned: true },
            { icon: "🌱", label: "Tree Hugger", earned: true },
            { icon: "⚡", label: "Quick Helper", earned: true },
            { icon: "🏆", label: "Champion", earned: false },
            { icon: "🌍", label: "Earth Hero", earned: true },
            { icon: "👥", label: "Team Player", earned: true },
            { icon: "🌟", label: "Star Donor", earned: false },
            { icon: "🎯", label: "Mission 100", earned: false },
            { icon: "💪", label: "Volunteer Pro", earned: false },
            { icon: "🔥", label: "On Fire", earned: true },
            { icon: "❤️", label: "Heart of Gold", earned: false },
          ].map((b) => (
            <div key={b.label} className={`text-center p-3 rounded-xl ${b.earned ? "bg-green-50 border border-green-200" : "bg-muted/40 border border-dashed border-border opacity-50"}`}>
              <div className="text-2xl mb-1">{b.icon}</div>
              <p className="text-xs font-medium text-foreground leading-tight">{b.label}</p>
              {!b.earned && <p className="text-xs text-muted-foreground mt-0.5">Locked</p>}
            </div>
          ))}
        </div>
      </div>

      {/* leaderboard */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <Trophy size={18} className="text-amber-500" />
          <h3 className="font-bold text-foreground">Community Leaderboard</h3>
        </div>
        <div className="divide-y divide-border">
          {leaderboard.map((u) => (
            <div key={u.rank} className={`flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors ${u.rank <= 3 ? "bg-amber-50/50" : ""}`}>
              <div className={`w-8 text-center font-bold text-sm ${u.rank === 1 ? "text-amber-500" : u.rank === 2 ? "text-gray-400" : u.rank === 3 ? "text-amber-600" : "text-muted-foreground"}`}>
                {u.rank === 1 ? "🥇" : u.rank === 2 ? "🥈" : u.rank === 3 ? "🥉" : `#${u.rank}`}
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">{u.avatar}</div>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">{u.name}</p>
                <p className="text-xs text-muted-foreground">{u.level} · {u.badges} badges</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">{u.points.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Reports Dashboard</h2>
        <p className="text-muted-foreground text-sm">Platform-wide impact analytics and statistics</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Meals", value: "4,430", change: "+12%", up: true, icon: Package },
          { label: "Blood Donors", value: "312", change: "+18%", up: true, icon: Droplets },
          { label: "Trees Planted", value: "875", change: "+8%", up: true, icon: Leaf },
          { label: "Vol. Hours", value: "2,340", change: "+24%", up: true, icon: Clock },
          { label: "Avg Impact Score", value: "87.4", change: "-2%", up: false, icon: Target },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-card rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon size={16} className="text-muted-foreground" />
                <span className={`text-xs font-bold flex items-center gap-0.5 ${k.up ? "text-green-600" : "text-red-500"}`}>
                  {k.up ? <ArrowUp size={11} /> : <ArrowDown size={11} />}{k.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{k.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{k.label}</p>
            </div>
          );
        })}
      </div>

      {/* bar chart */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-foreground">Monthly Donation & Donor Activity</h3>
          <select className="text-xs border border-border bg-input-background px-3 py-1.5 rounded-lg focus:outline-none">
            <option>2026</option>
            <option>2025</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={donationData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(22,163,74,0.1)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#4a7560" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#4a7560" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid rgba(22,163,74,0.2)", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
            <Bar dataKey="meals" name="Meals Donated" fill="#16a34a" radius={[6, 6, 0, 0]} />
            <Bar dataKey="donors" name="New Donors" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* module stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Volunteer Task Completion</h3>
          <div className="space-y-3">
            {[
              { task: "Feed Needy People", done: 78, total: 100 },
              { task: "Plant Trees", done: 52, total: 80 },
              { task: "Plastic-Free Challenge", done: 143, total: 200 },
              { task: "Community Clean-Up", done: 91, total: 120 },
            ].map((t) => (
              <div key={t.task}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-foreground">{t.task}</span>
                  <span className="text-muted-foreground">{t.done}/{t.total}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full" style={{ width: `${(t.done / t.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">User Growth by Role</h3>
          <div className="space-y-4">
            {[
              { role: "Volunteers", count: 682, pct: 55, color: "bg-green-500" },
              { role: "Users", count: 403, pct: 33, color: "bg-blue-500" },
              { role: "NGOs", count: 148, pct: 12, color: "bg-cyan-500" },
            ].map((r) => (
              <div key={r.role} className="flex items-center gap-4">
                <div className="w-20 text-xs font-medium text-muted-foreground shrink-0">{r.role}</div>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }} />
                </div>
                <div className="w-10 text-right text-sm font-bold text-foreground">{r.count}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Registered Users</span>
              <span className="font-bold text-foreground">1,233</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── nav config ───────────────────────────────────────────────────────────────
const navItems: { id: Module; label: string; icon: any; badge?: number }[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "users", label: "User Management", icon: Users },
  { id: "food", label: "Food Donation", icon: Package, badge: 8 },
  { id: "blood", label: "Blood Donors", icon: Droplets },
  { id: "emergency", label: "Emergency Hub", icon: Phone },
  { id: "volunteer", label: "Volunteer Tasks", icon: Heart },
  { id: "rewards", label: "Rewards", icon: Award },
  { id: "reports", label: "Reports", icon: BarChart3 },
];

// ─── app shell ────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState<Module>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const current = navItems.find((n) => n.id === active)!;

  const renderModule = () => {
    switch (active) {
      case "dashboard": return <Dashboard />;
      case "users": return <UserManagement />;
      case "food": return <FoodDonation />;
      case "blood": return <BloodDonorNetwork />;
      case "emergency": return <EmergencyHub />;
      case "volunteer": return <VolunteerTasks />;
      case "rewards": return <RewardsSystem />;
      case "reports": return <Reports />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* sidebar */}
      <aside className={`fixed lg:static z-30 h-full w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* logo */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center">
              <Heart size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-foreground text-sm leading-tight">WE HUMANS</p>
              <p className="text-xs text-muted-foreground">Care in Action</p>
            </div>
          </div>
        </div>

        {/* nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActive(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon size={17} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/30 text-white" : "bg-amber-100 text-amber-700"}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* user footer */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted cursor-pointer group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">RA</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">Rahul Admin</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <LogOut size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        </div>
      </aside>

      {/* main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* topbar */}
        <header className="h-14 bg-card border-b border-border flex items-center px-4 gap-4 shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-muted-foreground hover:text-foreground transition-colors">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
            <span className="text-muted-foreground/60 hidden sm:block">WE HUMANS</span>
            <ChevronRight size={14} className="text-muted-foreground/40 hidden sm:block" />
            <span className="font-semibold text-foreground truncate">{current.label}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input className="bg-input-background border border-border rounded-xl pl-9 pr-3 py-1.5 text-xs w-40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:w-56 transition-all" placeholder="Search…" />
            </div>
            <button className="relative w-9 h-9 rounded-xl bg-input-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  );
}
