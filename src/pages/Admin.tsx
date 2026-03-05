import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Save, 
  FileText, 
  LayoutDashboard, 
  ChevronRight, 
  Settings, 
  Users, 
  Activity,
  LogOut,
  Search,
  Bell,
  BarChart,
  Zap
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
}

interface Project {
  id: number;
  title: string;
  client: string;
  type: string;
  category: string;
  description: string;
  image: string;
  gallery: string[];
  achievements: string[];
  color: string;
  date: string;
}

type AdminView = 'dashboard' | 'content' | 'projects' | 'settings' | 'users';

export default function Admin() {
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [posts, setPosts] = useState<Post[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<Post> | null>(null);
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(null);
  const [loading, setLoading] = useState(true);
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: '#4fc3d0',
    secondaryColor: '#3d35b5',
    accentColor: '#1a8080',
    backgroundColor: '#071525',
    borderRadius: '24px',
    fontSans: 'Inter',
    siteName: 'ElitePro'
  });

  useEffect(() => {
    fetchPosts();
    fetchProjects();
    fetchSettings();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      const data = await response.json();
      if (Object.keys(data).length > 0) {
        setThemeSettings(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(themeSettings),
      });
      if (response.ok) {
        alert("Settings saved successfully! Refresh the site to see all changes.");
        window.location.reload(); // Reload to apply theme changes globally
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject?.title) return;

    const method = currentProject.id ? "PUT" : "POST";
    const url = currentProject.id ? `/api/projects/${currentProject.id}` : "/api/projects";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentProject),
      });

      if (response.ok) {
        fetchProjects();
        setIsEditingProject(false);
        setCurrentProject(null);
      }
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost?.title || !currentPost?.content) return;

    const method = currentPost.id ? "PUT" : "POST";
    const url = currentPost.id ? `/api/posts/${currentPost.id}` : "/api/posts";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentPost),
      });

      if (response.ok) {
        fetchPosts();
        setIsEditing(false);
        setCurrentPost(null);
      }
    } catch (error) {
      console.error("Failed to save post:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (response.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const SidebarItem = ({ icon: Icon, label, view }: { icon: any, label: string, view: AdminView }) => (
    <button
      onClick={() => setActiveView(view)}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
        activeView === view 
          ? "bg-[#4fc3d0] text-[#071525] font-medium shadow-lg shadow-[#4fc3d0]/20" 
          : "text-white/40 hover:text-white hover:bg-white/5"
      )}
    >
      <Icon size={18} />
      <span className="text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#071525] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-8 hidden md:flex">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-lg bg-[#4fc3d0] flex items-center justify-center text-[#071525]">
            <LayoutDashboard size={18} />
          </div>
          <span className="font-medium tracking-tight">ElitePro Admin</span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <SidebarItem icon={BarChart} label="Dashboard" view="dashboard" />
          <SidebarItem icon={FileText} label="Posts Manager" view="content" />
          <SidebarItem icon={Zap} label="Project Manager" view="projects" />
          <SidebarItem icon={Users} label="User Management" view="users" />
          <SidebarItem icon={Settings} label="Theme Settings" view="settings" />
        </nav>

        <div className="pt-6 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all">
            <LogOut size={18} />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-20 border-b border-white/10 px-8 flex items-center justify-between bg-[#071525]/50 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-96">
            <Search size={16} className="text-white/30" />
            <input 
              type="text" 
              placeholder="Search analytics, content, or users..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full placeholder:text-white/20"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-white/40 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#071525]" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right">
                <div className="text-xs font-medium">Admin User</div>
                <div className="text-[10px] text-white/30 font-mono uppercase tracking-widest">Super Admin</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4fc3d0] to-[#3d35b5]" />
            </div>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeView === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="flex items-end justify-between">
                  <div>
                    <h1 className="text-3xl font-medium tracking-tight mb-2">System Overview</h1>
                    <p className="text-white/40 text-sm">Real-time metrics and performance indicators for ElitePro ecosystem.</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors">Last 7 Days</button>
                    <button className="px-4 py-2 bg-[#4fc3d0] text-[#071525] rounded-lg text-xs font-bold hover:bg-[#5ed4e1] transition-colors">Export Report</button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: "Total Reach", value: "1.2M", change: "+12.5%", icon: Activity, color: "text-emerald-400" },
                    { label: "Active Events", value: "24", change: "+2", icon: Users, color: "text-[#4fc3d0]" },
                    { label: "AEO Index", value: "98.2", change: "+4.1", icon: Zap, color: "text-amber-400" },
                    { label: "System Health", value: "99.9%", change: "Stable", icon: Activity, color: "text-blue-400" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-white/5 rounded-lg">
                          <stat.icon size={18} className={stat.color} />
                        </div>
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5", stat.color)}>
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-medium mb-1">{stat.value}</div>
                      <div className="text-[10px] text-white/30 font-mono uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8">
                    <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                      <Activity size={18} className="text-[#4fc3d0]" />
                      Recent System Logs
                    </h3>
                    <div className="space-y-6">
                      {[
                        { event: "New Post Published", user: "Admin", time: "2 mins ago", status: "Success" },
                        { event: "AEO Sync Completed", user: "System", time: "15 mins ago", status: "Success" },
                        { event: "User Permission Updated", user: "SuperAdmin", time: "1 hour ago", status: "Success" },
                        { event: "Database Backup", user: "System", time: "4 hours ago", status: "Success" },
                      ].map((log, i) => (
                        <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                          <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-[#4fc3d0]" />
                            <div>
                              <div className="text-sm font-medium">{log.event}</div>
                              <div className="text-xs text-white/30">by {log.user}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-mono">{log.time}</div>
                            <div className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest">{log.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#3d35b5] to-[#1a1a1a] rounded-3xl p-8 border border-white/10">
                      <h3 className="text-lg font-medium mb-2">Admin Support</h3>
                      <p className="text-white/60 text-sm mb-6">Need help with the control panel? Access our documentation or contact support.</p>
                      <button className="w-full py-3 bg-white text-[#071525] rounded-xl font-bold text-sm hover:bg-white/90 transition-colors">
                        Open Docs
                      </button>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                      <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setActiveView('content')} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors text-center">
                          <Plus size={20} className="mx-auto mb-2 text-[#4fc3d0]" />
                          <span className="text-xs">New Post</span>
                        </button>
                        <button className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors text-center">
                          <Users size={20} className="mx-auto mb-2 text-[#4fc3d0]" />
                          <span className="text-xs">Add User</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeView === 'content' && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-medium tracking-tight mb-2">Content Management</h1>
                    <p className="text-white/40 text-sm">Manage your strategic updates, news, and research entries.</p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentPost({ title: "", content: "", category: "News" });
                      setIsEditing(true);
                    }}
                    className="flex items-center gap-2 bg-[#4fc3d0] hover:bg-[#5ed4e1] text-[#071525] px-6 py-3 rounded-full transition-all font-bold"
                  >
                    <Plus size={18} />
                    <span>New Entry</span>
                  </button>
                </div>

                {/* Content List */}
                <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
                  {loading ? (
                    <div className="p-20 text-center text-white/30 font-mono">Loading entries...</div>
                  ) : posts.length === 0 ? (
                    <div className="p-20 text-center">
                      <div className="text-white/30 font-mono mb-4">No entries found.</div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-[#4fc3d0] hover:underline font-medium"
                      >
                        Create your first post
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/10">
                      {posts.map((post) => (
                        <div
                          key={post.id}
                          className="group flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
                        >
                          <div className="flex-1 min-w-0 pr-8">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="px-2 py-0.5 bg-[#4fc3d0]/10 text-[#4fc3d0] text-[10px] font-mono uppercase tracking-wider rounded">
                                {post.category}
                              </span>
                              <span className="text-white/30 text-[10px] font-mono">
                                {new Date(post.date).toLocaleDateString()}
                              </span>
                            </div>
                            <h3 className="text-lg font-medium truncate group-hover:text-[#4fc3d0] transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-white/40 text-sm truncate max-w-2xl">
                              {post.content}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setCurrentPost(post);
                                setIsEditing(true);
                              }}
                              className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="p-2 hover:bg-red-500/10 rounded-lg text-white/60 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeView === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-medium tracking-tight mb-2">Project Portfolio</h1>
                    <p className="text-white/40 text-sm">Manage your strategic portfolio entries and case studies.</p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentProject({ 
                        title: "", 
                        client: "", 
                        type: "Event", 
                        category: "Corporate",
                        description: "",
                        image: "https://picsum.photos/seed/project/800/600",
                        gallery: [],
                        achievements: [],
                        color: "#4fc3d0"
                      });
                      setIsEditingProject(true);
                    }}
                    className="flex items-center gap-2 bg-[#4fc3d0] hover:bg-[#5ed4e1] text-[#071525] px-6 py-3 rounded-full transition-all font-bold"
                  >
                    <Plus size={18} />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group">
                      <div className="aspect-video relative overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button 
                            onClick={() => { setCurrentProject(project); setIsEditingProject(true); }}
                            className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-[#4fc3d0] hover:text-[#071525] transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="text-[10px] font-mono text-[#4fc3d0] uppercase tracking-widest mb-2">{project.client}</div>
                        <h3 className="text-lg font-medium mb-1">{project.title}</h3>
                        <p className="text-white/40 text-xs line-clamp-2">{project.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeView === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-4xl space-y-8"
              >
                <div>
                  <h1 className="text-3xl font-medium tracking-tight mb-2">Theme Customization</h1>
                  <p className="text-white/40 text-sm">Advanced modifications for the ElitePro ecosystem visual identity.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Settings size={18} className="text-[#4fc3d0]" />
                      Global Identity
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Site Name</label>
                        <input 
                          type="text" 
                          value={themeSettings.siteName}
                          onChange={(e) => setThemeSettings({...themeSettings, siteName: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4fc3d0] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Primary Font</label>
                        <select 
                          value={themeSettings.fontSans}
                          onChange={(e) => setThemeSettings({...themeSettings, fontSans: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4fc3d0] transition-colors appearance-none"
                        >
                          <option value="Inter">Inter (Modern Sans)</option>
                          <option value="Space Grotesk">Space Grotesk (Tech)</option>
                          <option value="Outfit">Outfit (Approachable)</option>
                          <option value="Playfair Display">Playfair Display (Luxury)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Border Radius</label>
                        <select 
                          value={themeSettings.borderRadius}
                          onChange={(e) => setThemeSettings({...themeSettings, borderRadius: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4fc3d0] transition-colors appearance-none"
                        >
                          <option value="0px">Sharp (0px)</option>
                          <option value="8px">Subtle (8px)</option>
                          <option value="16px">Modern (16px)</option>
                          <option value="24px">Approachable (24px)</option>
                          <option value="9999px">Round (Pill)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Zap size={18} className="text-amber-400" />
                      Color Palette
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Background Color</label>
                        <div className="flex gap-3">
                          <input 
                            type="color" 
                            value={themeSettings.backgroundColor}
                            onChange={(e) => setThemeSettings({...themeSettings, backgroundColor: e.target.value})}
                            className="w-12 h-12 bg-transparent border-none cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={themeSettings.backgroundColor}
                            onChange={(e) => setThemeSettings({...themeSettings, backgroundColor: e.target.value})}
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Primary Accent (Teal)</label>
                        <div className="flex gap-3">
                          <input 
                            type="color" 
                            value={themeSettings.primaryColor}
                            onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})}
                            className="w-12 h-12 bg-transparent border-none cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={themeSettings.primaryColor}
                            onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})}
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Secondary Accent (Purple)</label>
                        <div className="flex gap-3">
                          <input 
                            type="color" 
                            value={themeSettings.secondaryColor}
                            onChange={(e) => setThemeSettings({...themeSettings, secondaryColor: e.target.value})}
                            className="w-12 h-12 bg-transparent border-none cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={themeSettings.secondaryColor}
                            onChange={(e) => setThemeSettings({...themeSettings, secondaryColor: e.target.value})}
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Tertiary Accent (Dark Teal)</label>
                        <div className="flex gap-3">
                          <input 
                            type="color" 
                            value={themeSettings.accentColor}
                            onChange={(e) => setThemeSettings({...themeSettings, accentColor: e.target.value})}
                            className="w-12 h-12 bg-transparent border-none cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={themeSettings.accentColor}
                            onChange={(e) => setThemeSettings({...themeSettings, accentColor: e.target.value})}
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={handleSaveSettings}
                    className="flex items-center gap-2 bg-[#4fc3d0] text-[#071525] px-10 py-4 rounded-full font-bold hover:bg-[#5ed4e1] transition-all shadow-xl shadow-[#4fc3d0]/20"
                  >
                    <Save size={20} />
                    Apply Global Changes
                  </button>
                </div>
              </motion.div>
            )}

            {activeView === 'users' && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center py-40 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Settings size={32} className="text-white/20 animate-spin-slow" />
                </div>
                <h2 className="text-2xl font-medium mb-2">Module Under Development</h2>
                <p className="text-white/40 max-w-sm">This administrative module is currently being optimized for the ElitePro ecosystem.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Editor Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-[#071525]/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0a1e3a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-medium">
                    {currentPost?.id ? "Edit Entry" : "New Entry"}
                  </h2>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      value={currentPost?.title || ""}
                      onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4fc3d0] transition-colors"
                      placeholder="Enter post title..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
                        Category
                      </label>
                      <select
                        value={currentPost?.category || "News"}
                        onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4fc3d0] transition-colors appearance-none"
                      >
                        <option value="News">News</option>
                        <option value="Update">Update</option>
                        <option value="Research">Research</option>
                        <option value="Vision">Vision</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
                      Content
                    </label>
                    <textarea
                      required
                      rows={8}
                      value={currentPost?.content || ""}
                      onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4fc3d0] transition-colors resize-none"
                      placeholder="Write your content here..."
                    />
                  </div>

                  <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#4fc3d0] hover:bg-[#5ed4e1] text-[#071525] px-8 py-3 rounded-full transition-all font-bold"
                    >
                      <Save size={18} />
                      Save Entry
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Project Editor Modal */}
      <AnimatePresence>
        {isEditingProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditingProject(false)}
              className="absolute inset-0 bg-[#071525]/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0a1e3a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-medium">
                    {currentProject?.id ? "Edit Project" : "New Project"}
                  </h2>
                  <button
                    onClick={() => setIsEditingProject(false)}
                    className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSaveProject} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Project Title</label>
                      <input
                        type="text"
                        required
                        value={currentProject?.title || ""}
                        onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4fc3d0] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Client</label>
                      <input
                        type="text"
                        value={currentProject?.client || ""}
                        onChange={(e) => setCurrentProject({ ...currentProject, client: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4fc3d0] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Category</label>
                      <select
                        value={currentProject?.category || "Corporate"}
                        onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4fc3d0] transition-colors appearance-none"
                      >
                        <option value="Corporate">Corporate</option>
                        <option value="Government">Government</option>
                        <option value="Tech">Tech</option>
                        <option value="Luxury">Luxury</option>
                        <option value="Finance">Finance</option>
                        <option value="Sustainability">Sustainability</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Main Image URL</label>
                      <input
                        type="text"
                        value={currentProject?.image || ""}
                        onChange={(e) => setCurrentProject({ ...currentProject, image: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4fc3d0] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Description</label>
                    <textarea
                      rows={4}
                      value={currentProject?.description || ""}
                      onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#4fc3d0] transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditingProject(false)}
                      className="px-6 py-3 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#4fc3d0] hover:bg-[#5ed4e1] text-[#071525] px-8 py-3 rounded-full transition-all font-bold"
                    >
                      <Save size={18} />
                      Save Project
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
