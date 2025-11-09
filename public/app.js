import React, { useState, useEffect } from 'react';
import { School, Users, Upload, LogOut, Shield, Activity, TrendingUp, FileText, Menu, X, UserPlus } from 'lucide-react';

// Japanese/Chinese Art Background
const AsianArtBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'contrast(1.2)' }}>
        <defs>
          <pattern id="bamboo" x="0" y="0" width="120" height="200" patternUnits="userSpaceOnUse">
            <line x1="30" y1="0" x2="30" y2="200" stroke="#919D85" strokeWidth="3" />
            <line x1="90" y1="0" x2="90" y2="200" stroke="#919D85" strokeWidth="3" />
            <circle cx="30" cy="50" r="8" fill="none" stroke="#919D85" strokeWidth="2" />
            <circle cx="90" cy="100" r="8" fill="none" stroke="#919D85" strokeWidth="2" />
            <circle cx="30" cy="150" r="8" fill="none" stroke="#919D85" strokeWidth="2" />
            <path d="M 25 30 Q 10 25 15 15" fill="none" stroke="#BAC2B7" strokeWidth="2" />
            <path d="M 35 30 Q 50 25 45 15" fill="none" stroke="#BAC2B7" strokeWidth="2" />
            <path d="M 85 80 Q 70 75 75 65" fill="none" stroke="#BAC2B7" strokeWidth="2" />
            <path d="M 95 80 Q 110 75 105 65" fill="none" stroke="#BAC2B7" strokeWidth="2" />
          </pattern>
          <pattern id="mountains" x="0" y="0" width="400" height="300" patternUnits="userSpaceOnUse">
            <path d="M 0 200 Q 100 120 200 200" fill="none" stroke="#919D85" strokeWidth="2" opacity="0.5" />
            <path d="M 150 220 Q 250 140 350 220" fill="none" stroke="#BAC2B7" strokeWidth="2" opacity="0.4" />
            <circle cx="350" cy="100" r="30" fill="#e8a598" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="50%" fill="url(#mountains)" />
        <rect y="50%" width="100%" height="50%" fill="url(#bamboo)" />
      </svg>
    </div>
  );
};

// Login Page Component
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const sanitizedUsername = username.trim().toLowerCase();
      const sanitizedPassword = password.trim();

      if (!sanitizedUsername || !sanitizedPassword) {
        throw new Error('Please fill in all fields');
      }

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: sanitizedUsername, password: sanitizedPassword })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }

      const userData = await response.json();
      onLogin(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #CFD3D4 0%, #BAC2B7 100%)' }}>
      <AsianArtBackground />
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #919D85 0%, #BAC2B7 100%)' }}>
              <School className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#919D85' }}>Tailoring Schools</h1>
            <p className="text-gray-600">Multi-Tenant Dashboard System</p>
          </div>
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
            )}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#919D85] transition-all"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#919D85] transition-all"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white transition-all transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #919D85 0%, #BAC2B7 100%)' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
            <p className="text-gray-600 text-xs mb-2">Demo Credentials:</p>
            <p className="text-gray-700 text-xs">ABC School: abc / abc123</p>
            <p className="text-gray-700 text-xs">QWE School: qwe / qwe123</p>
            <p className="text-gray-700 text-xs">Admin: admin / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// School Dashboard Component
const SchoolDashboard = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState({ students: 0, courses: 12, teachers: 8, revenue: 45678 });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchSchoolData();
  }, [user.username]);

  const fetchSchoolData = async () => {
    try {
      const response = await fetch(`/api/school-data/${user.username}`);
      const result = await response.json();
      setStudents(result.students || []);
      setData(prev => ({ ...prev, students: result.students?.length || 0 }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 hover:scale-105 transition-transform cursor-pointer shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl" style={{ backgroundColor: color }}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <TrendingUp className="w-5 h-5" style={{ color: '#919D85' }} />
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold" style={{ color: '#919D85' }}>{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #CFD3D4 0%, #BAC2B7 50%, #919D85 100%)' }}>
      <AsianArtBackground />
      <header className="relative z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden" style={{ color: '#919D85' }}>
              {sidebarOpen ? <X /> : <Menu />}
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#919D85' }}>
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: '#919D85' }}>{user.schoolName}</h1>
                <p className="text-gray-600 text-sm">Dashboard</p>
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>
      <div className="flex">
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static z-20 w-64 h-[calc(100vh-73px)] bg-white/80 backdrop-blur-lg border-r border-gray-200 transition-transform`}>
          <nav className="p-4 space-y-2">
            {[
              { id: 'overview', icon: Activity, label: 'Overview' },
              { id: 'students', icon: Users, label: 'Students' },
              { id: 'courses', icon: FileText, label: 'Courses' },
              { id: 'upload', icon: Upload, label: 'Upload Data' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id ? 'text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                style={activeTab === item.id ? { backgroundColor: '#919D85' } : {}}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6 relative z-10 overflow-y-auto h-[calc(100vh-73px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#919D85' }}>Welcome back, {user.schoolName}!</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Users} title="Total Students" value={data.students} color="#919D85" />
                <StatCard icon={FileText} title="Active Courses" value={data.courses} color="#BAC2B7" />
                <StatCard icon={Users} title="Teachers" value={data.teachers} color="#919D85" />
                <StatCard icon={TrendingUp} title="Revenue" value={`$${data.revenue.toLocaleString()}`} color="#BAC2B7" />
              </div>
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold mb-4" style={{ color: '#919D85' }}>Recent Students</h3>
                <div className="space-y-3">
                  {students.slice(0, 5).map((student, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#BAC2B7' }}>
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium" style={{ color: '#919D85' }}>{student.student_name}</p>
                          <p className="text-gray-600 text-sm">{student.course || 'No course'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'upload' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#919D85' }}>Upload Data</h2>
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 text-center shadow-sm">
                <Upload className="w-16 h-16 mx-auto mb-4" style={{ color: '#919D85' }} />
                <h3 className="text-xl font-bold mb-2" style={{ color: '#919D85' }}>Upload Files</h3>
                <p className="text-gray-600 mb-6">Drag and drop files or click to browse</p>
                <button className="px-6 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90" style={{ backgroundColor: '#919D85' }}>
                  Select Files
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ user, onLogout }) => {
  const [schools, setSchools] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '', schoolName: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch('/api/admin/schools');
      const data = await response.json();
      setSchools(data.map(s => ({ 
        id: s.username, 
        name: s.school_name, 
        students: s.student_count || 0, 
        status: 'active' 
      })));
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  const handleAddUser = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!newUser.username || !newUser.password || !newUser.schoolName) {
        throw new Error('All fields are required');
      }

      const response = await fetch('/api/admin/add-school', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add school');
      }

      setSuccess('School added successfully!');
      setNewUser({ username: '', password: '', schoolName: '' });
      setShowAddUser(false);
      fetchSchools();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #CFD3D4 0%, #BAC2B7 50%, #919D85 100%)' }}>
      <AsianArtBackground />
      <header className="relative z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#919D85' }}>
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: '#919D85' }}>Super Admin Dashboard</h1>
              <p className="text-gray-600 text-sm">Manage all schools</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>
      <main className="p-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-sm">
            <School className="w-12 h-12 mb-4" style={{ color: '#919D85' }} />
            <h3 className="text-gray-600 text-sm mb-1">Total Schools</h3>
            <p className="text-3xl font-bold" style={{ color: '#919D85' }}>{schools.length}</p>
          </div>
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-sm">
            <Users className="w-12 h-12 mb-4" style={{ color: '#BAC2B7' }} />
            <h3 className="text-gray-600 text-sm mb-1">Total Students</h3>
            <p className="text-3xl font-bold" style={{ color: '#919D85' }}>{schools.reduce((sum, s) => sum + s.students, 0)}</p>
          </div>
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-sm">
            <Activity className="w-12 h-12 mb-4" style={{ color: '#919D85' }} />
            <h3 className="text-gray-600 text-sm mb-1">Active Schools</h3>
            <p className="text-3xl font-bold" style={{ color: '#919D85' }}>{schools.filter(s => s.status === 'active').length}</p>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ color: '#919D85' }}>All Schools</h2>
            <button
              onClick={() => setShowAddUser(!showAddUser)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: '#919D85' }}
            >
              <UserPlus className="w-5 h-5" />
              <span>Add School</span>
            </button>
          </div>
          {showAddUser && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#919D85' }}>Add New School</h3>
              {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
              {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{success}</div>}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
                  <input
                    type="text"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#919D85]"
                    placeholder="e.g., xyz"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#919D85]"
                    placeholder="Enter password"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">School Name</label>
                  <input
                    type="text"
                    value={newUser.schoolName}
                    onChange={(e) => setNewUser({ ...newUser, schoolName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#919D85]"
                    placeholder="e.g., XYZ School"
                    disabled={loading}
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddUser}
                    disabled={loading}
                    className="flex-1 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: '#919D85' }}
                  >
                    {loading ? 'Adding...' : 'Add School'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddUser(false);
                      setNewUser({ username: '', password: '', schoolName: '' });
                      setError('');
                      setSuccess('');
                    }}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold transition-all hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-4">
            {schools.map(school => (
              <div key={school.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#BAC2B7' }}>
                    <School className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: '#919D85' }}>{school.name}</h3>
                    <p className="text-gray-600 text-sm">{school.students} students</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">{school.status}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// Main App Component
export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return user.role === 'admin' 
    ? <AdminDashboard user={user} onLogout={handleLogout} />
    : <SchoolDashboard user={user} onLogout={handleLogout} />;
}
