const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const users = [];

app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, name, email } });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

app.get('/api/courses', (req, res) => {
  const courses = [
    {
      id: 1,
      title: 'TypeScript Masterclass',
      instructor: 'Dr. Instructor',
      rating: 4.2,
      reviews: '85,248',
      image: '/ts.png',
    },
    {
      id: 2,
      title: 'DevOps with Docker & Kubernetes',
      instructor: 'Dr. Instructor',
      rating: 4.0,
      reviews: '131,145',
      image: '/docker.png',
    },
    {
      id: 3,
      title: 'SQL & Database Design',
      instructor: 'Dr. Instructor',
      rating: 4.8,
      reviews: '75,022',
      image: '/sql.png',
    },
    {
      id: 4,
      title: 'Python for Data Science',
      instructor: 'Dr. Instructor',
      rating: 4.4,
      reviews: '147,640',
      image: '/python.png',
    },
    {
      id: 5,
      title: 'Advanced React Patterns',
      instructor: 'Jane Doe',
      rating: 4.9,
      reviews: '45,112',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225"><rect width="400" height="225" fill="%23282c34"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%2361dafb" font-weight="bold">REACT ADVANCED</text></svg>',
    },
    {
      id: 6,
      title: 'Mastering AWS Cloud',
      instructor: 'John Smith',
      rating: 4.7,
      reviews: '112,430',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225"><rect width="400" height="225" fill="%23ff9900"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23232f3e" font-weight="bold">AWS MASTERCLASS</text></svg>',
    },
    {
      id: 7,
      title: 'Fullstack Next.js',
      instructor: 'Alice Johnson',
      rating: 4.8,
      reviews: '56,200',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225"><rect width="400" height="225" fill="%23000000"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23ffffff" font-weight="bold">NEXT.JS FULL COURSE</text></svg>',
    },
    {
      id: 8,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Sarah Lee',
      rating: 4.6,
      reviews: '34,900',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225"><rect width="400" height="225" fill="%23f24e1e"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="22" fill="%23ffffff" font-weight="bold">FIGMA &amp; UI/UX</text></svg>',
    },
    {
      id: 9,
      title: 'Node.js Backend Architecture',
      instructor: 'Dr. Instructor',
      rating: 4.5,
      reviews: '67,800',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225"><rect width="400" height="225" fill="%23026e00"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23ffffff" font-weight="bold">NODE.JS ARCHITECTURE</text></svg>',
    }
  ];
  res.json(courses);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
