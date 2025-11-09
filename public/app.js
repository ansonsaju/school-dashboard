const { useState, useEffect } = React;
const { School, Users, Upload, LogOut, Shield, Activity, TrendingUp, FileText, Menu, X, UserPlus } = lucide;

// Create React elements helper
const e = React.createElement;

// Asian Art Background Component
function AsianArtBackground() {
  return e('div', { className: 'fixed inset-0 overflow-hidden pointer-events-none opacity-20' },
    e('svg', { className: 'absolute w-full h-full', xmlns: 'http://www.w3.org/2000/svg', style: { filter: 'contrast(1.2)' } },
      e('defs', null,
        e('pattern', { id: 'bamboo', x: '0', y: '0', width: '120', height: '200', patternUnits: 'userSpaceOnUse' },
          e('line', { x1: '30', y1: '0', x2: '30', y2: '200', stroke: '#919D85', strokeWidth: '3' }),
          e('line', { x1: '90', y1: '0', x2: '90', y2: '200', stroke: '#919D85', strokeWidth: '3' }),
          e('circle', { cx: '30', cy: '50', r: '8', fill: 'none', stroke: '#919D85', strokeWidth: '2' }),
          e('circle', { cx: '90', cy: '100', r: '8', fill: 'none', stroke: '#919D85', strokeWidth: '2' }),
          e('circle', { cx: '30', cy: '150', r: '8', fill: 'none', stroke: '#919D85', strokeWidth: '2' }),
          e('path', { d: 'M 25 30 Q 10 25 15 15', fill: 'none', stroke: '#BAC2B7', strokeWidth: '2' }),
          e('path', { d: 'M 35 30 Q 50 25 45 15', fill: 'none', stroke: '#BAC2B7', strokeWidth: '2' }),
          e('path', { d: 'M 85 80 Q 70 75 75 65', fill: 'none', stroke: '#BAC2B7', strokeWidth: '2' }),
          e('path', { d: 'M 95 80 Q 110 75 105 65', fill: 'none', stroke: '#BAC2B7', strokeWidth: '2' })
        ),
        e('pattern', { id: 'mountains', x: '0', y: '0', width: '400', height: '300', patternUnits: 'userSpaceOnUse' },
          e('path', { d: 'M 0 200 Q 100 120 200 200', fill: 'none', stroke: '#919D85', strokeWidth: '2', opacity: '0.5' }),
          e('path', { d: 'M 150 220 Q 250 140 350 220', fill: 'none', stroke: '#BAC2B7', strokeWidth: '2', opacity: '0.4' }),
          e('circle', { cx: '350', cy: '100', r: '30', fill: '#e8a598', opacity: '0.3' })
        )
      ),
      e('rect', { width: '100%', height: '50%', fill: 'url(#mountains)' }),
      e('rect', { y: '50%', width: '100%', height: '50%', fill: 'url(#bamboo)' })
    )
  );
}

// Login Page Component
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
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

  return e('div', { 
    className: 'min-h-screen flex items-center justify-center p-4', 
    style: { background: 'linear-gradient(135deg, #CFD3D4 0%, #BAC2B7 100%)' } 
  },
    e(AsianArtBackground),
    e('div', { className: 'w-full max-w-md relative z-10' },
      e('div', { className: 'bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200' },
        e('div', { className: 'text-center mb-8' },
          e('div', { 
            className: 'inline-flex items-center justify-center w-20 h-20 rounded-full mb-4', 
            style: { background: 'linear-gradient(135deg, #919D85 0%, #BAC2B7 100%)' } 
          },
            e(School, { size: 40, color: 'white' })
          ),
          e('h1', { className: 'text-3xl font-bold mb-2', style: { color: '#919D85' } }, 'Tailoring Schools'),
          e('p', { className: 'text-gray-600' }, 'Multi-Tenant Dashboard System')
        ),
        e('div', { className: 'space-y-6' },
          error && e('div', { className: 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg' }, error),
          e('div', null,
            e('label', { className: 'block text-gray-700 text-sm font-medium mb-2' }, 'Username'),
            e('input', {
              type: 'text',
              value: username,
              onChange: (ev) => setUsername(ev.target.value),
              className: 'w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#919D85] transition-all',
              placeholder: 'Enter your username'
            })
          ),
          e('div', null,
            e('label', { className: 'block text-gray-700 text-sm font-medium mb-2' }, 'Password'),
            e('input', {
              type: 'password',
              value: password,
              onChange: (ev) => setPassword(ev.target.value),
              className: 'w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#919D85] transition-all',
              placeholder: 'Enter your password'
            })
          ),
          e('button', {
            onClick: handleLogin,
            disabled: loading,
            className: 'w-full py-3 rounded-lg font-semibold text-white transition-all transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed',
            style: { background: 'linear-gradient(135deg, #919D85 0%, #BAC2B7 100%)' }
          }, loading ? 'Logging in...' : 'Login')
        ),
        e('div', { className: 'mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200' },
          e('p', { className: 'text-gray-600 text-xs mb-2' }, 'Demo Credentials:'),
          e('p', { className: 'text-gray-700 text-xs' }, 'ABC School: abc / abc123'),
          e('p', { className: 'text-gray-700 text-xs' }, 'QWE School: qwe / qwe123'),
          e('p', { className: 'text-gray-700 text-xs' }, 'Admin: admin / admin123')
        )
      )
    )
  );
}

// School Dashboard Component
function SchoolDashboard({ user, onLogout }) {
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

  const StatCard = ({ icon: Icon, title, value, color }) => {
    return e('div', { className: 'bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 hover:scale-105 transition-transform cursor-pointer shadow-sm' },
      e('div', { className: 'flex items-center justify-between mb-4' },
        e('div', { className: 'p-3 rounded-xl', style: { backgroundColor: color } },
          e(Icon, { size: 24, color: 'white' })
        ),
        e(TrendingUp, { size: 20, color: '#919D85' })
      ),
      e('h3', { className: 'text-gray-600 text-sm mb-1' }, title),
      e('p', { className: 'text-3xl font-bold', style: { color: '#919D85' } }, value)
    );
  };

  return e('div', { className: 'min-h-screen', style: { background: 'linear-gradient(135deg, #CFD3D4 0%, #BAC2B7 50%, #919D85 100%)' } },
    e(AsianArtBackground),
    e('header', { className: 'relative z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm' },
      e('div', { className: 'px-6 py-4 flex items-center justify-between' },
        e('div', { className: 'flex items-center space-x-4' },
          e('button', { onClick: () => setSidebarOpen(!sidebarOpen), className: 'lg:hidden', style: { color: '#919D85' } },
            sidebarOpen ? e(X, { size: 24 }) : e(Menu, { size: 24 })
          ),
          e('div', { className: 'flex items-center space-x-3' },
            e('div', { className: 'w-10 h-10 rounded-full flex items-center justify-center', style: { backgroundColor: '#919D85' } },
              e(School, { size: 24, color: 'white' })
            ),
            e('div', null,
              e('h1', { className: 'text-xl font-bold', style: { color: '#919D85' } }, user.schoolName),
              e('p', { className: 'text-gray-600 text-sm' }, 'Dashboard')
            )
          )
        ),
        e('button', {
          onClick: onLogout,
          className: 'flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all'
        },
          e(LogOut, { size: 16 }),
          e('span', null, 'Logout')
        )
      )
    ),
    e('div', { className: 'flex' },
      e('aside', { className: `${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static z-20 w-64 h-[calc(100vh-73px)] bg-white/80 backdrop-blur-lg border-r border-gray-200 transition-transform` },
        e('nav', { className: 'p-4 space-y-2' },
          [
            { id: 'overview', icon: Activity, label: 'Overview' },
            { id: 'students', icon: Users, label: 'Students' },
            { id: 'courses', icon: FileText, label: 'Courses' },
            { id: 'upload', icon: Upload, label: 'Upload Data' }
          ].map(item =>
            e('button', {
              key: item.id,
              onClick: () => setActiveTab(item.id),
              className: `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id ? 'text-white' : 'text-gray-600 hover:bg-gray-50'}`,
              style: activeTab === item.id ? { backgroundColor: '#919D85' } : {}
            },
              e(item.icon, { size: 20 }),
              e('span', null, item.label)
            )
          )
        )
      ),
      e('main', { className: 'flex-1 p-6 relative z-10 overflow-y-auto h-[calc(100vh-73px)]' },
        activeTab === 'overview' && e('div', { className: 'space-y-6' },
          e('h2', { className: 'text-2xl font-bold mb-6', style: { color: '#919D85' } }, `Welcome back, ${user.schoolName}!`),
          e('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' },
            e(StatCard, { icon: Users, title: 'Total Students', value: data.students, color: '#919D85' }),
            e(StatCard, { icon: FileText, title: 'Active Courses', value: data.courses, color: '#BAC2B7' }),
            e(StatCard, { icon: Users, title: 'Teachers', value: data.teachers, color: '#919D85' }),
            e(StatCard, { icon: TrendingUp, title: 'Revenue', value: `$${data.revenue.toLocaleString()}`, color: '#BAC2B7' })
          ),
          e('div', { className: 'bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-sm' },
            e('h3', { className: 'text-xl font-bold mb-4', style: { color: '#919D85' } }, 'Recent Students'),
            e('div', { className: 'space-y-3' },
              students.slice(0, 5).map((student, i) =>
                e('div', { key: i, className: 'flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all' },
                  e('div', { className: 'flex items-center space-x-3' },
                    e('div', { className: 'w-10 h-10 rounded-full flex items-center justify-center', style: { backgroundColor: '#BAC2B7' } },
                      e(Users, { size: 20, color: 'white' })
                    ),
                    e('div', null,
                      e('p', { className: 'font-medium', style: { color: '#919D85' } }, student.student_name),
                      e('p', { className: 'text-gray-600 text-sm' }, student.course || 'No course')
                    )
                  )
                )
              )
            )
          )
        ),
        activeTab === 'upload' && e('div', { className: 'space-y-6' },
          e('h2', { className: 'text-2xl font-bold mb-6', style: { color: '#919D85' } }, 'Upload Data'),
          e('div', { className: 'bg-white/90 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 text-center shadow-sm' },
            e(Upload, { size: 64, color: '#919D85', style: { margin: '0 auto 1rem' } }),
            e('h3', { className: 'text-xl font-bold mb-2', style: { color: '#919D85' } }, 'Upload Files'),
            e('p', { className: 'text-gray-600 mb-6' }, 'Drag and drop files or click to browse'),
            e('button', { className: 'px-6 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90', style: { backgroundColor: '#919D85' } }, 'Select Files')
          )
        )
      )
    )
  );
}

// Admin Dashboard Component
function AdminDashboard({ user, onLogout }) {
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

  return e('div', { className: 'min-h-screen', style: { background: 'linear-gradient(135deg, #CFD3D4 0%, #BAC2B7 50%, #919D85 100%)' } },
    e(AsianArtBackground),
    e('header', { className: 'relative z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm' },
      e('div', { className: 'px-6 py-4 flex items-center justify-between' },
        e('div', { className: 'flex items-center space-x-3' },
          e('div', { className: 'w-10 h-10 rounded-full flex items-center justify-center', style: { backgroundColor: '#919D85' } },
            e(Shield, { size: 24, color: 'white' })
          ),
          e('div', null,
            e('h1', { className: 'text-xl font-bold', style: { color: '#919D85' } }, 'Super Admin Dashboard'),
            e('p', { className: 'text-gray-600 text-sm' }, 'Manage all schools')
          )
        ),
        e('button', {
          onClick: onLogout,
          className: 'flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all'
        },
          e(LogOut, { size: 16 }),
          e('span', null, 'Logout')
        )
      )
    ),
    e('main', { className: 'p-6 relative z-10' },
      e('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6 mb-8' },
        e('div', { className: 'bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-sm' },
          e(School, { size: 48, color: '#919D85', style: { marginBottom: '1rem' } }),
          e('h3', { className: 'text-gray-600 text-sm mb-1' }, 'Total Schools'),
          e('p', { className: 'text-3xl font-bold', style: { color: '#919D85' } }, schools.length)
        ),
        e('div', { className: 'bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-sm' },
          e(Users, { size: 48, color: '#BAC2B7', style: { marginBottom: '1rem' } }),
          e('h3', { className: 'text-gray-600 text-sm mb-1' }, 'Total Students'),
          e('p', { className: 'text-3xl font-bold', style: { color: '#919D85' } }, schools.reduce((sum, s) => sum + s.students, 0))
        ),
        e('div', { className: 'bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-sm' },
          e(Activity, { size: 48, color: '#919D85', style: { marginBottom: '1rem' } }),
          e('h3', { className: 'text-gray-600 text-sm mb-1' }, 'Active Schools'),
          e('p', { className: 'text-3xl font-bold', style: { color: '#919D85' } }, schools.filter(s => s.status === 'active').length)
        )
      ),
      e('div', { className: 'bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-sm' },
        e('div', { className: 'flex items-center justify-between mb-6' },
          e('h2', { className: 'text-2xl font-bold', style: { color: '#919D85' } }, 'All Schools'),
          e('button', {
            onClick: () => setShowAddUser(!showAddUser),
            className: 'flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90',
            style: { backgroundColor: '#919D85' }
          },
            e(UserPlus, { size: 20 }),
            e('span', null, 'Add School')
          )
        ),
        showAddUser && e('div', { className: 'mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200' },
          e('h3', { className: 'text-lg font-bold mb-4', style: { color: '#919D85' } }, 'Add New School'),
          error && e('div', { className: 'mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm' }, error),
          success && e('div', { className: 'mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm' }, success),
          e('div', { className: 'space-y-4' },
            e('div', null,
              e('label', { className: 'block text-gray-700 text-sm font-medium mb-2' }, 'Username'),
              e('input', {
                type: 'text',
                value: newUser.username,
                onChange: (ev) => setNewUser({ ...newUser, username: ev.target.value }),
                className: 'w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#919D85]',
                placeholder: 'e.g., xyz',
                disabled: loading
              })
            ),
            e('div', null,
              e('label', { className: 'block text-gray-700 text-sm font-medium mb-2' }, 'Password'),
              e('input', {
                type: 'password',
                value: newUser.password,
                onChange: (ev) => setNewUser({ ...newUser, password: ev.target.value }),
                className: 'w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#919D85]',
                placeholder: 'Enter password',
                disabled: loading
              })
            ),
            e('div', null,
              e('label', { className: 'block text-gray-700 text-sm font-medium mb-2' }, 'School Name'),
              e('input', {
                type: 'text',
                value: newUser.schoolName,
                onChange: (ev) => setNewUser({ ...newUser, schoolName: ev.target.value }),
                className: 'w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#919D85]',
                placeholder: 'e.g., XYZ School',
                disabled: loading
              })
            ),
            e('div', { className: 'flex space-x-3' },
              e('button', {
                onClick: handleAddUser,
                disabled: loading,
                className: 'flex-1 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90 disabled:opacity-50',
                style: { backgroundColor: '#919D85' }
              }, loading ? 'Adding...' : 'Add School'),
              e('button', {
                onClick: () => {
                  setShowAddUser(false);
                  setNewUser({ username: '', password: '', schoolName: '' });
                  setError('');
                  setSuccess('');
                },
                className: 'px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold transition-all hover:bg-gray-300'
              }, 'Cancel')
            )
          )
        ),
        e('div', { className: 'space-y-4' },
          schools.map(school =>
            e('div', { key: school.id, className: 'flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all' },
              e('div', { className: 'flex items-center space-x-4' },
                e('div', { className: 'w-12 h-12 rounded-full flex items-center justify-center', style: { backgroundColor: '#BAC2B7' } },
                  e(School, { size: 24, color: 'white' })
                ),
                e('div', null,
                  e('h3', { className: 'font-semibold', style: { color: '#919D85' } }, school.name),
                  e('p', { className: 'text-gray-600 text-sm' }, `${school.students} students`)
                )
              ),
              e('span', { className: 'px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium' }, school.status)
            )
          )
        )
      )
    )
  );
}

// Main App Component
function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return e(LoginPage, { onLogin: handleLogin });
  }

  return user.role === 'admin' 
    ? e(AdminDashboard, { user: user, onLogout: handleLogout })
    : e(SchoolDashboard, { user: user, onLogout: handleLogout });
}

// Initialize Lucide icons
lucide.createIcons();

// Render the app
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(e(App));
