-- Drop existing tables if they exist
DROP TABLE IF EXISTS contact_submissions;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS services;

-- Services Table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    service_id VARCHAR(10) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    category VARCHAR(100),
    year VARCHAR(10),
    description TEXT,
    image_url TEXT,
    align VARCHAR(20) DEFAULT 'left',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Submissions Table
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data
INSERT INTO services (service_id, title, description, image_url) VALUES 
('01', 'Architecture', 'We design buildings that are purposeful, enduring, and deeply connected to their surroundings.', 'https://cdn.prod.website-files.com/69f5a976715525ce3175cda8/69f5a978715525ce3175ce10_service-1-img.webp'),
('02', 'Interior Design', 'Beyond surface-level styling, we craft interiors that feel as good as they look.', 'https://cdn.prod.website-files.com/69f5a976715525ce3175cda8/69f5a978715525ce3175ce11_service-2-img.webp'),
('03', 'Layout Planning', 'We organize environments around people, movement, and use, creating clarity, comfort, and adaptability.', 'https://cdn.prod.website-files.com/69f5a976715525ce3175cda8/69f5a978715525ce3175ce0c_service-3-img.webp'),
('04', 'Project Management', 'We ensure your vision is delivered on time, on budget, and to the highest standards.', 'https://cdn.prod.website-files.com/69f5a976715525ce3175cda8/69f5a978715525ce3175ce0f_service-4-img.webp');

INSERT INTO projects (title, location, category, year, description, image_url, align) VALUES 
('Pacific Horizon Villa', 'Malibu, CA', 'Residential', '2023', 'A seamless integration of indoor and outdoor living, this residence features floor-to-ceiling glass walls that frame the Pacific horizon.', 'https://cdn.prod.website-files.com/69f5a976715525ce3175cda8/69f5a978715525ce3175ce05_Contemporary%20House%20at%20Dawn_Dusk.jpeg', 'left'),
('The Industrial Sanctuary', 'Shoreditch, London', 'Mixed-Use', '2022', 'A transformation of a historic industrial warehouse into a light-filled sanctuary, combining raw structural elements with refined minimalist interiors.', 'https://cdn.prod.website-files.com/69f5a976715525ce3175cda8/69f5a978715525ce3175ce04_Modern%20Minimalist%20House%20with%20Garden.jpeg', 'right');

INSERT INTO reviews (name, role, content, rating) VALUES 
('Elena Rossi', 'Homeowner', 'Architrave Architects transformed our vision into a reality that far exceeded our expectations. Their attention to detail is unparalleled.', 5),
('Marcus Thorne', 'Property Developer', 'Working with this team is a masterclass in professional collaboration. They deliver on time and with exceptional quality.', 5);
