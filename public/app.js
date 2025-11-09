const { useState, useEffect, createElement: h } = React;

// Icon components
const School = (props) => h('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, h('path', { d: "M14 22v-4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v4" }), h('path', { d: "M20 8v12a2 2 0 0 1-2 2H6" }), h('path', { d: "M2 10h20" }));

const Users = (props) => h('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, h('path', { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }), h('circle', { cx: "9", cy: "7", r: "4" }), h('path', { d: "M22 21v-2a4 4 0 0 0-3-3.87" }), h('path', { d: "M16 3.13a4 4 0 0 1 0 7.75" }));

const Upload = (props) => h('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, h('path', { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }), h('polyline', { points: "17 8 12 3 7 8" }), h('line', { x1: "12", x2: "12", y1: "3", y2: "15" }));

const LogOut = (props) => h('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, h('path', { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), h('polyline', { points: "16 17 21 12 16 7" }), h('line', { x1: "21", x2: "9", y1: "12", y2: "12" }));

const Shield = (props) => h('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, h('path', { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" }));

const Activity = (props) => h('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, h('path', { d: "M22 12h-4l-3 9L9 3l-3 9H2" }));

const TrendingUp = (props) => h('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, h('polyline', { points: "23 6 13.5 15.5 8.5 10.5 1 18" }), h('polyline', { points: "17 6 23 6 23 12" }));

const FileText = (props) => h('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, h('path', { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), h('polyline', { points: "14 2 14 8 20 8" }), h('line', { x1: "16", x2: "8", y1: "13", y2: "13" }), h('line', { x1: "16", x2: "8", y1: "17", y2: "17" }), h('line', { x1: "10", x2: "8", y1: "9", y2: "9" }));

const Menu = (props) => h('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, h('line', { x1: "4", x2: "20", y1: "12", y2: "12" }), h('line', { x1: "4", x2: "20", y1: "6", y2: "6" }), h('line', { x1: "4", x2: "20", y1: "18", y2: "18" }));

const X = (props) => h('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, h('path', { d: "M18 6 6 18" }), h('path', { d: "m6 6 12 12" }));

// Japanese Background Component
const JapaneseBackground = () => {
  return h('div', { className: 'fixed inset-0 overflow-hidden pointer-events-none opacity-10' },
    h('svg', { className: 'absolute w-full h-full', xmlns: 'http://www.w3.org/2000/svg' },
      h('defs', {},
        h('pattern', { id: 'wave', x: '0', y: '0', width: '200', height: '200', patternUnits: 'userSpaceOnUse' },
          h('path', { d: 'M0 100 Q 50 80, 100 100 T 200 100', fill: 'none', stroke: '#565285', strokeWidth: '2' }),
          h('path', { d: 'M0 120 Q 50 100, 100 120 T 200 120', fill: 'none', stroke: '#9A98BD', strokeWidth: '2' }),
          h('circle', { cx: '150', cy: '50', r: '20', fill: '#B3A7BF', opacity: '0.3' })
        )
      ),
      h('rect', { width: '100%', height: '100%', fill: 'url(#wave)' })
    )
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

      // Call backend API
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

  return h('div', { className: 'min-h-screen flex items-center justify-center p-4', style: { background: 'linear-gradient(135deg, #2F3162 0%, #292A3E 100%)' } },
    h(JapaneseBackground),
    h('div', { className: 'w-full max-w-md relative z-10' },
      h('div', { className: 'bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20' },
        h('div', { className: 'text-center mb-8' },
          h('div', { className: 'inline-flex items-center justify-center w-20 h-20 rounded-full mb-4', style: { background: 'linear-gradient(135deg, #B3A7BF 0%, #9A98BD 100%)' } },
            h(School, { className: 'w-10 h-10 text-white' })
          ),
          h('h1', { className: 'text-3xl font-bold text-white mb-2' }, 'Tailoring Schools'),
          h('p', { className: 'text-white/70' }, 'Multi-Tenant Dashboard System')
        ),
        h('div', { className: 'space-y-6' },
          error && h('div', { className: 'bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg' }, error),
          h('div', {},
            h('label', { className: 'block text-white/80 text-sm font-medium mb-2' }, 'Username'),
            h('input', {
              type: 'text',
              value: username,
              onChange: (e) => setUsername(e.target.value),
              className: 'w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#B3A7BF] transition-all',
              placeholder: 'Enter your username',
              required: true
            })
          ),
          h('div', {},
            h('label', { className: 'block text-white/80 text-sm font-medium mb-2' }, 'Password'),
            h('input', {
              type: 'password',
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: 'w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#B3A7BF] transition-all',
              placeholder: 'Enter your password',
              required: true
            })
          ),
          h('button', {
            onClick: handleLogin,
            disabled: loading,
            className: 'w-full py-3 rounded-lg font-semibold text-white transition-all transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed',
            style: { background: 'linear-gradient(135deg, #9A98BD 0%, #565285 100%)' }
          }, loading ? 'Logging in...' : 'Login')
        ),
        h('div', { className: 'mt-6 p-4 rounded-lg bg-white/5 border border-white/10' },
          h('p', { className: 'text-white/60 text-xs mb-2' }, 'Demo Credentials:'),
          h('p', { className: 'text-white/80 text-xs' }, 'ABC School: abc / abc123'),
          h('p', { className: 'text-white/80 text-xs' }, 'QWE School: qwe / qwe123'),
          h('p', { className: 'text-white/80 text-xs' }, 'Admin: admin / admin123')
        )
      )
    )
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

  const StatCard = ({ icon: Icon, title, value, color }) => {
    return h('div', { className: 'bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform cursor-pointer' },
      h('div', { className: 'flex items-center justify-between mb-4' },
        h('div', { className: 'p-3 rounded-xl', style: { backgroundColor: color } },
          h(Icon, { className: 'w-6 h-6 text-white' })
        ),
        h(TrendingUp, { className: 'w-5 h-5 text-green-400' })
      ),
      h('h3', { className: 'text-white/70 text-sm mb-1' }, title),
      h('p', { className: 'text-3xl font-bold text-white' }, value)
    );
  };

  return h('div', { className: 'min-h-screen', style: { background: 'linear-gradient(135deg, #2F3162 0%, #292A3E 100%)' } },
    h(JapaneseBackground),
    h('header', { className: 'relative z-10 bg-white/5 backdrop-blur-lg border-b border-white/10' },
      h('div', { className: 'px-6 py-4 flex items-center justify-between' },
        h('div', { className: 'flex items-center space-x-4' },
          h('button', { onClick: () => setSidebarOpen(!sidebarOpen), className: 'lg:hidden text-white' },
            sidebarOpen ? h(X) : h(Menu)
          ),
          h('div', { className: 'flex items-center space-x-3' },
            h('div', { className: 'w-10 h-10 rounded-full flex items-center justify-center', style: { backgroundColor: '#B3A7BF' } },
              h(School, { className: 'w-6 h-6 text-white' })
            ),
            h('div', {},
              h('h1', { className: 'text-xl font-bold text-white' }, user.schoolName),
              h('p', { className: 'text-white/60 text-sm' }, 'Dashboard')
            )
          )
        ),
        h('button', {
          onClick: onLogout,
          className: 'flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 transition-all'
        },
          h(LogOut, { className: 'w-4 h-4' }),
          h('span', {}, 'Logout')
        )
      )
    ),
    h('div', { className: 'flex' },
      h('aside', { className: `${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static z-20 w-64 h-[calc(100vh-73px)] bg-white/5 backdrop-blur-lg border-r border-white/10 transition-transform` },
        h('nav', { className: 'p-4 space-y-2' },
          [
            { id: 'overview', icon: Activity, label: 'Overview' },
            { id: 'students', icon: Users, label: 'Students' },
            { id: 'courses', icon: FileText, label: 'Courses' },
            { id: 'upload', icon: Upload, label: 'Upload Data' }
          ].map(item =>
            h('button', {
              key: item.id,
              onClick: () => setActiveTab(item.id),
              className: `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id ? 'bg-[#9A98BD] text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}`
            },
              h(item.icon, { className: 'w-5 h-5' }),
              h('span', {}, item.label)
            )
          )
        )
      ),
      h('main', { className: 'flex-1 p-6 relative z-10 overflow-y-auto h-[calc(100vh-73px)]' },
        activeTab === 'overview' && h('div', { className: 'space-y-6' },
          h('h2', { className: 'text-2xl font-bold text-white mb-6' }, `Welcome back, ${user.schoolName}!`),
          h('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' },
            h(StatCard, { icon: Users, title: 'Total Students', value: data.students, color: '#9A98BD' }),
            h(StatCard, { icon: FileText, title: 'Active Courses', value: data.courses, color: '#565285' }),
            h(StatCard, { icon: Users, title: 'Teachers', value: data.teachers, color: '#B3A7BF' }),
            h(StatCard, { icon: TrendingUp, title: 'Revenue', value: `$${data.revenue.toLocaleString()}`, color: '#9A98BD' })
          ),
          h('div', { className: 'bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20' },
            h('h3', { className: 'text-xl font-bold text-white mb-4' }, 'Recent Students'),
            h('div', { className: 'space-y-3' },
              students.slice(0, 5).map((student, i) =>
                h('div', { key: i, className: 'flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all' },
                  h('div', { className: 'flex items-center space-x-3' },
                    h('div', { className: 'w-10 h-10 rounded-full bg-[#B3A7BF] flex items-center justify-center' },
                      h(Users, { className: 'w-5 h-5 text-white' })
                    ),
                    h('div', {},
                      h('p', { className: 'text-white font-medium' }, student.student_name),
                      h('p', { className: 'text-white/60 text-sm' }, student.course || 'No course')
                    )
                  )
                )
              )
            )
          )
        ),
        activeTab === 'upload' && h('div', { className: 'space-y-6' },
          h('h2', { className: 'text-2xl font-bold text-white mb-6' }, 'Upload Data'),
          h('div', { className: 'bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center' },
            h(Upload, { className: 'w-16 h-16 text-[#B3A7BF] mx-auto mb-4' }),
            h('h3', { className: 'text-xl font-bold text-white mb-2' }, 'Upload Files'),
            h('p', { className: 'text-white/60 mb-6' }, 'Drag and drop files or click to browse'),
            h('button', { className: 'px-6 py-3 rounded-lg bg-[#9A98BD] text-white font-semibold hover:bg-[#565285] transition-all' }, 'Select Files')
          )
        )
      )
    )
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ user, onLogout }) => {
  const [schools, setSchools] = useState([]);

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

  return h('div', { className: 'min-h-screen', style: { background: 'linear-gradient(135deg, #2F3162 0%, #292A3E 100%)' } },
    h(JapaneseBackground),
    h('header', { className: 'relative z-10 bg-white/5 backdrop-blur-lg border-b border-white/10' },
      h('div', { className: 'px-6 py-4 flex items-center justify-between' },
        h('div', { className: 'flex items-center space-x-3' },
          h('div', { className: 'w-10 h-10 rounded-full flex items-center justify-center', style: { backgroundColor: '#B3A7BF' } },
            h(Shield, { className: 'w-6 h-6 text-white' })
          ),
          h('div', {},
            h('h1', { className: 'text-xl font-bold text-white' }, 'Super Admin Dashboard'),
            h('p', { className: 'text-white/60 text-sm' }, 'Manage all schools')
          )
        ),
        h('button', {
          onClick: onLogout,
          className: 'flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 transition-all'
        },
          h(LogOut, { className: 'w-4 h-4' }),
          h('span', {}, 'Logout')
        )
      )
    ),
    h('main', { className: 'p-6 relative z-10' },
      h('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6 mb-8' },
        h('div', { className: 'bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20' },
          h(School, { className: 'w-12 h-12 text-[#B3A7BF] mb-4' }),
          h('h3', { className: 'text-white/70 text-sm mb-1' }, 'Total Schools'),
          h('p', { className: 'text-3xl font-bold text-white' }, schools.length)
        ),
        h('div', { className: 'bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20' },
          h(Users, { className: 'w-12 h-12 text-[#9A98BD] mb-4' }),
          h('h3', { className: 'text-white/70 text-sm mb-1' }, 'Total Students'),
          h('p', { className: 'text-3xl font-bold text-white' }, schools.reduce((sum, s) => sum + s.students, 0))
        ),
        h('div', { className: 'bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20' },
          h(Activity, { className: 'w-12 h-12 text-[#565285] mb-4' }),
          h('h3', { className: 'text-white/70 text-sm mb-1' }, 'Active Schools'),
          h('p', { className: 'text-3xl font-bold text-white' }, schools.filter(s => s.status === 'active').length)
        )
      ),
      h('div', { className: 'bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20' },
        h('h2', { className: 'text-2xl font-bold text-white mb-6' }, 'All Schools'),
        h('div', { className: 'space-y-4' },
          schools.map(school =>
            h('div', { key: school.id, className: 'flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all' },
              h('div', { className: 'flex items-center space-x-4' },
                h('div', { className: 'w-12 h-12 rounded-full bg-[#B3A7BF] flex items-center justify-center' },
                  h(School, { className: 'w-6 h-6 text-white' })
                ),
                h('div', {},
                  h('h3', { className: 'text-white font-semibold' }, school.name),
                  h('p', { className: 'text-white/60 text-sm' }, `${school.students} students`)
                )
              ),
              h('span', { className: 'px-3 py-1 rounded-full bg-green-500/20 text-green-200 text-sm' }, school.status)
            )
          )
        )
      )
    )
  );
};

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
    return h(LoginPage, { onLogin: handleLogin });
  }

  return user.role === 'admin' 
    ? h(AdminDashboard, { user: user, onLogout: handleLogout })
    : h(SchoolDashboard, { user: user, onLogout: handleLogout });
}

// Render the app
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(h(App));
