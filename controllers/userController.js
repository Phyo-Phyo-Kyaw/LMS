// Import the User model
import User from '../models/User.js';

// Add new user
export const newUser = async (req, res) => {
	const { email, password, confirmPassword } = req.body;

	if (password !== confirmPassword) {
		return res.render('register', { error: 'Passwords do not match' });
	}

	try {
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.render('register', { error: 'User already exists' });
		}

		const newUser = new User({ email, password });
		await newUser.save();

		res.redirect('/admin');
	} catch (err) {
		res.render('register', { error: 'Server error' });
	}
};

// Login user
export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.render('login', { error: 'Invalid credentials' });
		}

		// const isMatch = await user.comparePassword(password);
		// if (!isMatch) {
		// 	return res.render('login', { error: 'Invalid credentials' });
		// }
		req.session.user = user;
		// If login is successful, you can set a session or token here
		res.redirect('/admin'); // Redirect to a protected page after successful login
	} catch (err) {
		res.render('login', { error: 'Server error' });
	}
};
