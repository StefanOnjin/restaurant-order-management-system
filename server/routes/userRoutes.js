const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

//  Registracija korisnika
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Ime, email i lozinka su obavezni." });
    }

    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Korisnik sa tim emailom već postoji." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.createUser(name, email, hashedPassword, phone, role);

    res.status(201).json({ message: "Registracija uspešna!", user: newUser });
  } catch (err) {
    console.error("Greška pri registraciji:", err);
    res.status(500).json({ error: "Greška na serveru." });
  }
});

//  Prijava korisnika 
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByEmail(email);

    if (!user) {
      return res.status(400).json({ error: "Neispravan email ili lozinka." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Neispravan email ili lozinka." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET || "tajna_kljuceva",
      { expiresIn: "2h" }
    );

    res.json({ message: "Uspešna prijava!", token });
  } catch (err) {
    console.error("Greška pri prijavi:", err);
    res.status(500).json({ error: "Greška na serveru." });
  }
});

//  Lista svih korisnika
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Greška pri preuzimanju korisnika:", err);
    res.status(500).json({ error: "Greška na serveru." });
  }
});

module.exports = router;
