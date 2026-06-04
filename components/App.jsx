"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin, Phone, Mail, Search, Filter, ShoppingBag, User, Lock, Plus, Trash2, Edit, Settings,
  CheckCircle, MessageSquare, Star, Menu, X, ChevronDown, ChevronUp, Shield, Heart, Sparkles,
  TrendingUp, DollarSign, Globe, Truck, Eye, LogOut, Clock, ArrowRight, Check, Image as ImageIcon,
  ChevronRight, RefreshCw, Smartphone, Upload, Trash, Info, Share2, HelpCircle, EyeOff, BarChart2,
  FileText, Award
} from 'lucide-react';
import { api } from '@/lib/api';

const STORAGE_PREFIX = 'impal:';

function loadFromStorage(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    // ignore quota / serialization errors
  }
}

function usePersistedState(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [hydrated, setHydrated] = useState(false);

  // After mount on client, hydrate from localStorage. This avoids SSR mismatch.
  useEffect(() => {
    setValue(loadFromStorage(key, initialValue));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveToStorage(key, value);
  }, [key, value, hydrated]);

  return [value, setValue];
}

const initialProducts = [
  {
    id: 1,
    name: "Impal Premium Crystal Sugar",
    category: "Sugar",
    weight: "1kg",
    weights: ["500g", "1kg", "5kg"],
    description: "Sulphur-free, double-refined premium crystal sugar made from the finest handpicked Indian sugarcane. Dissolves instantly and ensures 100% purity in every spoon.",
    price: 64,
    oldPrice: 75,
    stock: 250,
    rating: 4.8,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1581781868515-51543be28646?auto=format&fit=crop&q=80&w=600",
    isFeatured: true,
    isVisible: true,
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "Impal Superfine Raw Brown Sugar",
    category: "Sugar",
    weight: "1kg",
    weights: ["1kg", "2kg"],
    description: "Rich in natural molasses, organic brown sugar offering a subtle caramel flavour. Healthy alternative with zero artificial additives, perfect for premium baking and daily brewing.",
    price: 95,
    oldPrice: 110,
    stock: 120,
    rating: 4.9,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=600",
    isFeatured: true,
    isVisible: true,
    tag: "Organic"
  },
  {
    id: 3,
    name: "Impal Premium Thin Poha",
    category: "Poha",
    weight: "500g",
    weights: ["500g", "1kg"],
    description: "Delicately flattened high-yield rice flakes. Specially processed for traditional Maharashtrian Kanda Poha and light breakfast roasted snacks.",
    price: 48,
    oldPrice: 55,
    stock: 180,
    rating: 4.7,
    reviews: 205,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600",
    isFeatured: true,
    isVisible: true,
    tag: "Super Light"
  },
  {
    id: 4,
    name: "Impal Premium Medium Poha",
    category: "Poha",
    weight: "1kg",
    weights: ["500g", "1kg", "2kg"],
    description: "Ideally textured flattened rice flakes with high nutrient retention. Holds water perfectly without getting mushy. Great for balanced, wholesome family breakfasts.",
    price: 55,
    oldPrice: 65,
    stock: 300,
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?auto=format&fit=crop&q=80&w=600",
    isFeatured: true,
    isVisible: true,
    tag: "Chef's Choice"
  },
  {
    id: 5,
    name: "Impal High-Fiber Thick Poha",
    category: "Poha",
    weight: "1kg",
    weights: ["1kg", "5kg"],
    description: "Thick, nutrient-dense flattened rice. Perfect for deep-frying into crispy Indori Poha, savory Chivda mixes, or healthy traditional steaming.",
    price: 58,
    oldPrice: 70,
    stock: 150,
    rating: 4.6,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
    isFeatured: false,
    isVisible: true,
    tag: "High Fiber"
  }
];

const initialGallery = [
  {
    id: 1,
    title: "100% Fully Automated Cleaning Sieve",
    description: "Modern German-engineered vibratory sieve sorters removing broken flakes.",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600",
    category: "Factory"
  },
  {
    id: 2,
    title: "Clean Storage Silos",
    description: "Air-locked and moisture-monitored stainless steel silos holding processed sugar.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
    category: "Infrastructure"
  },
  {
    id: 3,
    title: "Organic Sugarcane Fields",
    description: "Sourced directly from certified chemical-free sugarcane growers in Central India.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600",
    category: "Farming"
  }
];

const initialTestimonials = [
  {
    id: 1,
    name: "Srabanti Deshmukh",
    role: "Home Maker",
    location: "Pune",
    rating: 5,
    quote: "Impal Premium Crystal Sugar is really superior. It is super clean and transparent. I have stopped buying open loose sugars entirely because my family's health is my top priority."
  },
  {
    id: 2,
    name: "Ramesh Gupta",
    role: "Gupta & Sons Wholesalers",
    location: "Gwalior",
    rating: 5,
    quote: "As a wholesale distributor, I have seen Poha brands fluctuate heavily in quality. But Impal Medium Poha retains its uniform thickness and dry texture across all batches."
  },
  {
    id: 3,
    name: "Nehal Kapoor",
    role: "Dietitian & Fitness Coach",
    location: "Indore",
    rating: 5,
    quote: "The thin poha from Impal is perfect for making dry roasted Chivda snacks. It absorbs spices extremely well without crumbling down. Very clean processing!"
  }
];

const initialFaqs = [
  {
    id: 1,
    question: "What makes Impal Sugar completely sulphur-free?",
    answer: "Unlike ordinary white sugars which use sulphur dioxide during processing, Impal Sugar undergoes a state-of-the-art double-refining process using advanced carbonation and filtration techniques. This ensures zero chemical residues."
  },
  {
    id: 2,
    question: "How is Impal Poha sourced and prepared?",
    answer: "We source high-quality paddy directly from fertile river belts in Madhya Pradesh and Maharashtra. It is parboiled, roasted, and flattened in hygienic chambers to retain nutritional minerals."
  },
  {
    id: 3,
    question: "Are there bulk distributor options available?",
    answer: "Yes, Impal Food has an extensive distribution network. Fill out the Distributor Enquiry form, and our sales team will reach out with customized wholesale quotes within 24 hours."
  }
];

const defaultSettings = {
  brandName: "Impal Food",
  tagline: "Purity. Trust. Quality.",
  heroDescription:
    "At IMPAL, we bring you the finest daily essentials directly from the heart of India's richest agricultural hubs. Packed with utmost care, hygiene, and transparency, we ensure that every grain adds sweetness, health, and joy to your family's daily meals.",
  aboutHeading: "Specializing in the Two Pillars of Every Indian Pantry",
  aboutP1:
    "At IMPAL, our journey started with a simple belief: the most essential ingredients in your kitchen deserve the highest standard of care. We chose to specialize in the two pillars of every household pantry — Premium Sugar and Authentic Poha.",
  aboutP2:
    "We understand what makes a perfect batch. For our Poha, we select high-quality paddy grains to give you that authentic texture and lightness that central India loves. For our Sugar, we ensure sparkling, high-grade crystals that dissolve perfectly without any impurities.",
  aboutP3:
    "What sets IMPAL apart is our strict focus on modern, untouched-by-hand packaging and rigorous quality checks. We bridge the gap between the finest fields and your modern kitchen, ensuring that every sealed pouch of IMPAL Sugar and Poha brings health, hygiene, and happiness to your family.",
  metaTitle: "Impal Food | Premium Sugar & Poha Supplier in India",
  metaDesc: "Discover the pure, chemical-free goodness of Impal Premium Crystal Sugar and the traditional fluffy texture of Impal Poha. Hygienically packaged.",
  metaKeywords: "Sulphur free sugar, pure crystal sugar, premium poha, organic brown sugar, kanda poha, Indori poha wholesale",
  heroImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200",
  whatsappNumber: "+919993408621",
  address: "44/4, Pardeshipura, Indore (M.P) - 452003",
  email: "impalfoodscontact@gmail.com",
  phone: "+91 99934 08621",
  facebookUrl: "https://facebook.com/impalfood",
  instagramUrl: "https://instagram.com/impalfood",
  linkedinUrl: "https://linkedin.com/company/impalfood",
  ecommerceActive: true,
  displayPublicPrices: true,
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.55627678583!2d75.79462529243734!3d22.7239117621946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b457c3b%3A0xeae0905a5a6a655d!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1716240000000!5m2!1sen!2sin",
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = usePersistedState('products', initialProducts);
  const [gallery, setGallery] = usePersistedState('gallery', initialGallery);
  const [testimonials, setTestimonials] = usePersistedState('testimonials', initialTestimonials);
  const [faqs, setFaqs] = usePersistedState('faqs', initialFaqs);
  const [settings, setSettings] = usePersistedState('settings', defaultSettings);
  const [categories, setCategories] = usePersistedState('categories', ["Sugar", "Poha"]);
  const [cart, setCart] = usePersistedState('cart', []);
  const [orders, setOrders] = usePersistedState('orders', []);
  const [toasts, setToasts] = useState([]);
  const [enquiries, setEnquiries] = usePersistedState('enquiries', [
    {
      id: 1,
      name: "Rajesh Kumar Sharma",
      business: "Sharma Grocery Wholesalers Ltd",
      phone: "+91 98765 43210",
      email: "rajesh.sharma@sharmagrocers.com",
      city: "Indore",
      state: "Madhya Pradesh",
      message: "Interested in regional distributorship for Impal Poha and Crystal Sugar in western MP.",
      status: "Pending",
      date: "2026-05-18",
      type: "Distributor"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [quickViewImageIndex, setQuickViewImageIndex] = useState(0);
  const [selectedCardWeights, setSelectedCardWeights] = useState({});
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Secure Admin Authentication States (auth flag persisted across reloads)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = usePersistedState('adminAuth', false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');

  // Form Submission States
  const [contactName, setContactName] = useState('');
  const [contactBusiness, setContactBusiness] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCity, setContactCity] = useState('');
  const [contactState, setContactState] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactType, setContactType] = useState('Inquiry'); 

  const [editingProductId, setEditingProductId] = useState(null);
  const [prodForm, setProdForm] = useState({
    name: '', 
    category: 'Sugar', 
    weight: '1kg', 
    weightOptionsInput: '500g, 1kg, 5kg',
    description: '', 
    price: '', 
    oldPrice: '', 
    stock: 100, 
    image: '', 
    images: [],
    isFeatured: false, 
    isVisible: true,
    tag: ''
  });

  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryDesc, setNewGalleryDesc] = useState('');
  const [newGalleryImage, setNewGalleryImage] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('Factory');

  const [newTestimonialName, setNewTestimonialName] = useState('');
  const [newTestimonialRole, setNewTestimonialRole] = useState('');
  const [newTestimonialLocation, setNewTestimonialLocation] = useState('');
  const [newTestimonialQuote, setNewTestimonialQuote] = useState('');
  const [newTestimonialRating, setNewTestimonialRating] = useState(5);

  const [newCategoryInput, setNewCategoryInput] = useState('');

  const [languagePref, setLanguagePref] = useState('english'); // 'english' or 'bilingual'
  const [colorTheme, setColorTheme] = useState('forest-gold'); // 'forest-gold' or 'vintage-brown'

  // Backend connectivity: when true, the app reads/writes through the Django API.
  const [backendOnline, setBackendOnline] = useState(false);
  const [categoryIdMap, setCategoryIdMap] = useState({}); // { "Sugar": 1, "Poha": 2 }
  const [settingsId, setSettingsId] = useState(null);

  // Try to hydrate everything from the backend on mount. On any failure we stay
  // in offline mode and keep using the locally persisted (localStorage) data.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [cats, prods, gal, tests, siteSettings] = await Promise.all([
          api.getCategories(),
          api.getProducts(),
          api.getGallery(),
          api.getTestimonials(),
          api.getSettings(),
        ]);
        if (cancelled) return;

        const idMap = {};
        cats.forEach((c) => { idMap[c.name] = c.id; });
        setCategoryIdMap(idMap);
        setCategories(cats.map((c) => c.name));
        setProducts(prods);
        setGallery(gal);
        setTestimonials(tests);
        if (siteSettings) {
          setSettingsId(siteSettings._id);
          const { _id, ...rest } = siteSettings;
          setSettings((prev) => ({ ...prev, ...rest }));
        }
        setBackendOnline(true);

        // Authenticated extras (orders + enquiries) only if a token exists.
        if (isAdminAuthenticated) {
          try {
            const [ords, enqs] = await Promise.all([api.getOrders(), api.getEnquiries()]);
            if (!cancelled) {
              setOrders(ords);
              setEnquiries(enqs);
            }
          } catch {
            // token likely expired; keep local
          }
        }
      } catch {
        if (!cancelled) setBackendOnline(false);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const addToCart = (product, forcedWeight = null) => {
    const chosenWeight = forcedWeight || selectedCardWeights[product.id] || product.weight;
    const cartItemIndex = cart.findIndex(item => item.id === product.id && item.chosenWeight === chosenWeight);
    
    if (cartItemIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[cartItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, chosenWeight, quantity: 1 }]);
    }
    triggerToast(`${product.name} (${chosenWeight}) added to cart!`);
  };

  const updateCartQuantity = (id, chosenWeight, delta) => {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.chosenWeight === chosenWeight) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean);
    setCart(updatedCart);
  };

  const removeFromCart = (id, chosenWeight) => {
    setCart(cart.filter(item => !(item.id === id && item.chosenWeight === chosenWeight)));
    triggerToast("Item removed from cart", "error");
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !contactEmail) {
      triggerToast("Please fill in name, phone, and email.", "error");
      return;
    }

    const payload = {
      name: contactName,
      business: contactBusiness || "Retail Customer",
      phone: contactPhone,
      email: contactEmail,
      city: contactCity || "Not Provided",
      state: contactState || "Not Provided",
      message: contactMessage,
      type: contactType
    };

    if (backendOnline) {
      try {
        const saved = await api.createEnquiry(payload);
        setEnquiries([saved, ...enquiries]);
      } catch (err) {
        triggerToast(`Could not submit enquiry: ${err.message}`, "error");
        return;
      }
    } else {
      setEnquiries([{ ...payload, id: enquiries.length + 1, status: "Pending", date: new Date().toISOString().split('T')[0] }, ...enquiries]);
    }

    triggerToast(`Thank you, ${contactName}! Your enquiry has been registered.`);
    setContactName('');
    setContactBusiness('');
    setContactPhone('');
    setContactEmail('');
    setContactCity('');
    setContactState('');
    setContactMessage('');
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    // Preferred path: real JWT auth against the Django backend.
    if (backendOnline) {
      try {
        await api.login(adminUsername, adminPassword);
        setIsAdminAuthenticated(true);
        setAdminError('');
        triggerToast("JWT authorized. Welcome back, Administrator.");
        try {
          const [ords, enqs] = await Promise.all([api.getOrders(), api.getEnquiries()]);
          setOrders(ords);
          setEnquiries(enqs);
        } catch {
          // non-fatal
        }
        return;
      } catch {
        setAdminError("Access Denied. Invalid credentials.");
        triggerToast("Authentication Failed", "error");
        return;
      }
    }

    // Offline fallback (no backend reachable): demo credentials.
    if (adminUsername === 'admin' && adminPassword === 'impal2026') {
      setIsAdminAuthenticated(true);
      setAdminError('');
      triggerToast("Offline mode: demo admin session started.");
    } else {
      setAdminError("Access Denied. Invalid master key.");
      triggerToast("Authentication Failed", "error");
    }
  };

  useEffect(() => {
    setQuickViewImageIndex(0);
  }, [selectedProductDetails]);

  const handleAdminLogout = () => {
    api.logout();
    setIsAdminAuthenticated(false);
    setAdminUsername('');
    setAdminPassword('');
    triggerToast("Logged out securely.");
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const photoList = (prodForm.images && prodForm.images.length)
      ? prodForm.images
      : (prodForm.image ? [prodForm.image] : []);
    if (!prodForm.name || !prodForm.price || photoList.length === 0) {
      triggerToast("Please fill name, price, and add at least one product photo.", "error");
      return;
    }

    const parsedPrice = parseFloat(prodForm.price);
    const parsedOldPrice = parseFloat(prodForm.oldPrice || 0);
    const parsedWeights = prodForm.weightOptionsInput.split(',').map(w => w.trim()).filter(Boolean);

    const draft = {
      name: prodForm.name,
      category: prodForm.category,
      weight: parsedWeights[0] || prodForm.weight,
      weights: parsedWeights,
      description: prodForm.description,
      price: parsedPrice,
      oldPrice: parsedOldPrice || null,
      stock: parseInt(prodForm.stock),
      image: photoList[0],
      images: photoList,
      isFeatured: prodForm.isFeatured,
      isVisible: prodForm.isVisible,
      tag: prodForm.tag
    };

    if (backendOnline) {
      try {
        const categoryId = categoryIdMap[prodForm.category];
        if (editingProductId) {
          const updated = await api.updateProduct(editingProductId, draft, categoryId);
          setProducts(products.map(p => p.id === editingProductId ? updated : p));
          triggerToast("Product updated in database!");
        } else {
          const created = await api.createProduct(draft, categoryId);
          setProducts([...products, created]);
          triggerToast("New product saved to database!");
        }
        resetProductForm();
        return;
      } catch (err) {
        triggerToast(`Save failed: ${err.message}`, "error");
        return;
      }
    }

    // Offline fallback (local state only)
    if (editingProductId) {
      setProducts(products.map(p => p.id === editingProductId ? { ...p, ...draft } : p));
      triggerToast("Product details updated locally!");
    } else {
      const newProduct = {
        ...draft,
        id: products.length + 1,
        rating: 5.0,
        reviews: 0,
        tag: prodForm.tag || "Fresh"
      };
      setProducts([...products, newProduct]);
      triggerToast("New SKU added locally!");
    }

    resetProductForm();
  };

  const resetProductForm = () => {
    setEditingProductId(null);
    setProdForm({ 
      name: '', category: categories[0] || 'Sugar', weight: '1kg', weightOptionsInput: '500g, 1kg, 5kg',
      description: '', price: '', oldPrice: '', stock: 100, image: '', images: [], isFeatured: false, isVisible: true, tag: '' 
    });
  };

  const startEditProduct = (p) => {
    setEditingProductId(p.id);
    setProdForm({
      name: p.name,
      category: p.category,
      weight: p.weight,
      weightOptionsInput: (p.weights || [p.weight]).join(', '),
      description: p.description,
      price: p.price,
      oldPrice: p.oldPrice || '',
      stock: p.stock,
      image: p.image,
      images: (p.images && p.images.length) ? p.images : (p.image ? [p.image] : []),
      isFeatured: p.isFeatured || false,
      isVisible: p.isVisible !== false,
      tag: p.tag || ''
    });
  };

  const deleteProduct = async (id) => {
    if (backendOnline) {
      try {
        await api.deleteProduct(id);
      } catch (err) {
        triggerToast(`Delete failed: ${err.message}`, "error");
        return;
      }
    }
    setProducts(products.filter(p => p.id !== id));
    triggerToast("Product removed from database.", "error");
  };

  const applyUploadedImage = (targetForm, url) => {
    if (targetForm === 'product') {
      setProdForm(prev => {
        const nextImages = [...(prev.images || []), url];
        return { ...prev, images: nextImages, image: prev.image || url };
      });
    } else if (targetForm === 'gallery') {
      setNewGalleryImage(url);
    }
  };

  const addProductImageUrl = (url) => {
    const clean = (url || '').trim();
    if (!clean) return;
    setProdForm(prev => {
      if ((prev.images || []).includes(clean)) return prev;
      const nextImages = [...(prev.images || []), clean];
      return { ...prev, images: nextImages, image: prev.image || clean };
    });
  };

  const removeProductImage = (index) => {
    setProdForm(prev => {
      const nextImages = (prev.images || []).filter((_, i) => i !== index);
      return { ...prev, images: nextImages, image: nextImages[0] || '' };
    });
  };

  const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const handlePhotoUpload = async (e, targetForm) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // For gallery we only keep a single image; products support many.
    const fileList = targetForm === 'product' ? files : [files[0]];

    for (const file of fileList) {
      // Preferred: upload to Cloudinary through the backend (requires admin token).
      if (backendOnline) {
        try {
          const url = await api.uploadImage(file);
          applyUploadedImage(targetForm, url);
          continue;
        } catch (err) {
          triggerToast(`Cloudinary upload failed (${err.message}). Stored locally instead.`, "error");
          // fall through to base64 fallback for this file
        }
      }
      try {
        const dataUrl = await readFileAsDataUrl(file);
        applyUploadedImage(targetForm, dataUrl);
      } catch {
        triggerToast("Could not read one of the selected files.", "error");
      }
    }

    triggerToast(
      fileList.length > 1
        ? `${fileList.length} photos added.`
        : "Photo added.",
    );
    // Allow re-selecting the same file(s) again.
    e.target.value = '';
  };

  const handleAddGalleryItem = async (e) => {
    e.preventDefault();
    if (!newGalleryTitle || !newGalleryImage) {
      triggerToast("Required details are missing.", "error");
      return;
    }
    const draft = {
      title: newGalleryTitle,
      description: newGalleryDesc || "Premium infrastructure image.",
      image: newGalleryImage,
      category: newGalleryCategory
    };

    if (backendOnline) {
      try {
        const saved = await api.createGallery(draft);
        setGallery([...gallery, saved]);
      } catch (err) {
        triggerToast(`Could not add image: ${err.message}`, "error");
        return;
      }
    } else {
      setGallery([...gallery, { ...draft, id: gallery.length + 1 }]);
    }

    setNewGalleryTitle('');
    setNewGalleryDesc('');
    setNewGalleryImage('');
    triggerToast("New gallery visual published!");
  };

  const deleteGalleryItem = async (id) => {
    if (backendOnline) {
      try {
        await api.deleteGallery(id);
      } catch (err) {
        triggerToast(`Delete failed: ${err.message}`, "error");
        return;
      }
    }
    setGallery(gallery.filter(item => item.id !== id));
    triggerToast("Photo removed from registry.");
  };

  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    if (!newTestimonialName || !newTestimonialQuote) {
      triggerToast("Provide author name and review content.", "error");
      return;
    }
    const draft = {
      name: newTestimonialName,
      role: newTestimonialRole || "Verified Buyer",
      location: newTestimonialLocation || "India",
      rating: parseInt(newTestimonialRating),
      quote: newTestimonialQuote
    };

    if (backendOnline) {
      try {
        const saved = await api.createTestimonial(draft);
        setTestimonials([...testimonials, saved]);
      } catch (err) {
        triggerToast(`Could not add review: ${err.message}`, "error");
        return;
      }
    } else {
      setTestimonials([...testimonials, { ...draft, id: testimonials.length + 1 }]);
    }

    setNewTestimonialName('');
    setNewTestimonialRole('');
    setNewTestimonialLocation('');
    setNewTestimonialQuote('');
    triggerToast("Testimonial review appended!");
  };

  const deleteTestimonial = async (id) => {
    if (backendOnline) {
      try {
        await api.deleteTestimonial(id);
      } catch (err) {
        triggerToast(`Delete failed: ${err.message}`, "error");
        return;
      }
    }
    setTestimonials(testimonials.filter(t => t.id !== id));
    triggerToast("Review hidden from storefront.");
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryInput.trim()) return;
    const categoryName = newCategoryInput.trim();
    if (categories.includes(categoryName)) {
      triggerToast("Category already exists.", "error");
      return;
    }

    if (backendOnline) {
      try {
        const saved = await api.createCategory(categoryName);
        setCategoryIdMap({ ...categoryIdMap, [saved.name]: saved.id });
      } catch (err) {
        triggerToast(`Could not add category: ${err.message}`, "error");
        return;
      }
    }

    setCategories([...categories, categoryName]);
    setNewCategoryInput('');
    triggerToast(`"${categoryName}" added to categories!`);
  };

  const deleteCategory = async (catToDelete) => {
    if (backendOnline && categoryIdMap[catToDelete]) {
      try {
        await api.deleteCategory(categoryIdMap[catToDelete]);
        const next = { ...categoryIdMap };
        delete next[catToDelete];
        setCategoryIdMap(next);
      } catch (err) {
        triggerToast(`Delete failed (category may have products): ${err.message}`, "error");
        return;
      }
    }
    setCategories(categories.filter(c => c !== catToDelete));
    triggerToast(`Category "${catToDelete}" deleted.`);
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (backendOnline) {
      try {
        const payload = {
          customer_name: contactName || "Guest Customer",
          customer_phone: contactPhone || "",
          customer_email: contactEmail || "",
          items: cart.map(item => ({
            product: typeof item.id === 'number' ? item.id : null,
            product_name: item.name,
            chosen_weight: item.chosenWeight,
            quantity: item.quantity,
            unit_price: item.price,
          })),
        };
        const saved = await api.createOrder(payload);
        setOrders([saved, ...orders]);
        setCart([]);
        setCurrentPage('tracking');
        triggerToast("Order placed in database! Directing to tracker.", "success");
        return;
      } catch (err) {
        triggerToast(`Checkout failed: ${err.message}`, "error");
        return;
      }
    }

    const orderId = `IMP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      items: [...cart],
      total: cartTotal,
      date: new Date().toLocaleDateString(),
      status: "Awaiting Shipment",
      timeline: ["Order Placed", "Awaiting Shipment"]
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setCurrentPage('tracking');
    triggerToast("Mock payment successful! Directing to real-time tracker.", "success");
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    if (backendOnline) {
      try {
        const updated = await api.updateOrderStatus(orderId, newStatus);
        setOrders(orders.map(o => o.orderId === orderId ? updated : o));
        triggerToast(`Order ${orderId} → ${newStatus}`);
        return;
      } catch (err) {
        triggerToast(`Status update failed: ${err.message}`, "error");
        return;
      }
    }
    setOrders(orders.map(o => {
      if (o.orderId !== orderId) return o;
      const timeline = o.timeline.includes(newStatus) ? o.timeline : [...o.timeline, newStatus];
      return { ...o, status: newStatus, timeline };
    }));
    triggerToast(`Order ${orderId} → ${newStatus}`);
  };

  const deleteOrder = (orderId) => {
    setOrders(orders.filter(o => o.orderId !== orderId));
    triggerToast(`Order ${orderId} removed`, 'error');
  };

  // ==================== Real-Time Analytics (computed from live data) ====================
  const analytics = useMemo(() => {
    const totalProducts = products.length;
    const visibleProducts = products.filter(p => p.isVisible !== false).length;
    const featuredProducts = products.filter(p => p.isFeatured).length;
    const lowStock = products.filter(p => (p.stock ?? 0) < 50);
    const productsByCategory = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    const enquiriesByStatus = enquiries.reduce((acc, en) => {
      acc[en.status] = (acc[en.status] || 0) + 1;
      return acc;
    }, {});
    const pendingEnquiries = enquiries.filter(en => en.status === 'Pending').length;
    return {
      totalProducts,
      visibleProducts,
      featuredProducts,
      lowStock,
      productsByCategory,
      enquiriesByStatus,
      pendingEnquiries,
    };
  }, [products, enquiries]);

  const filteredProducts = products.filter(p => {
    // Hide invisible items for public users, always show for admins in dashboard
    if (!p.isVisible && !isAdminAuthenticated) return false;

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`min-h-screen flex flex-col font-sans bg-stone-50 text-stone-800 selection:bg-emerald-800 selection:text-white`}>
      
      {/* Top SEO & Meta Information Bar */}
      <div className="bg-emerald-950 text-stone-300 text-[11px] py-2 px-4 flex justify-between items-center border-b border-emerald-900 hidden md:flex">
        <div className="flex items-center space-x-4">
          <span><strong>Active SEO Title:</strong> {settings.metaTitle}</span>
          <span className="text-emerald-800">|</span>
          <span><strong>FSSAI Standard:</strong> 100% Secure Hygiene Certified</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">Secure SSL Authorized</span>
          <span className="bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">Secure Gate: SHA-256</span>
        </div>
      </div>

      {}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-md border-b border-stone-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Brand Segment */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="w-12 h-12 rounded-full bg-emerald-800 flex items-center justify-center shadow-md border-2 border-amber-400">
                <span className="text-white font-serif text-2xl font-bold tracking-tight">I</span>
              </div>
              <div>
                <span className="text-2xl font-serif font-bold tracking-wide text-emerald-900 block leading-tight">{settings.brandName}</span>
                <span className="text-[10px] tracking-widest font-semibold text-amber-600 block uppercase">Pure Premium Foods</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-8 items-center">
              <button onClick={() => setCurrentPage('home')} className={`font-medium text-sm tracking-wide transition-all ${currentPage === 'home' ? 'text-emerald-800 font-bold border-b-2 border-amber-500' : 'text-stone-600 hover:text-emerald-800'}`}>
                {languagePref === 'bilingual' ? 'मुख्य पृष्ठ / Home' : 'Home'}
              </button>
              <button onClick={() => setCurrentPage('about')} className={`font-medium text-sm tracking-wide transition-all ${currentPage === 'about' ? 'text-emerald-800 font-bold border-b-2 border-amber-500' : 'text-stone-600 hover:text-emerald-800'}`}>
                {languagePref === 'bilingual' ? 'हमारे बारे में / About Us' : 'About Us'}
              </button>
              <button onClick={() => setCurrentPage('products')} className={`font-medium text-sm tracking-wide transition-all ${currentPage === 'products' ? 'text-emerald-800 font-bold border-b-2 border-amber-500' : 'text-stone-600 hover:text-emerald-800'}`}>
                {languagePref === 'bilingual' ? 'उत्पाद सूची / Our Products' : 'Our Products'}
              </button>
              <button onClick={() => setCurrentPage('contact')} className={`font-medium text-sm tracking-wide transition-all ${currentPage === 'contact' ? 'text-emerald-800 font-bold border-b-2 border-amber-500' : 'text-stone-600 hover:text-emerald-800'}`}>
                {languagePref === 'bilingual' ? 'संपर्क / Contact' : 'Contact Us'}
              </button>
              
              <button 
                onClick={() => {
                  setCurrentPage('admin');
                  if (!isAdminAuthenticated) triggerToast("Locked private system. Please input password.", "info");
                }} 
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${isAdminAuthenticated ? 'bg-emerald-800 text-white border-emerald-800' : 'text-amber-700 border-amber-400 hover:bg-amber-50'}`}
              >
                <Lock className="w-3 h-3" />
                <span>{isAdminAuthenticated ? 'Secure Panel' : 'Admin Panel'}</span>
              </button>
            </nav>

            {/* Right Header Controls (Search, Menu) */}
            <div className="flex items-center space-x-3">

              {orders.length > 0 && (
                <button 
                  onClick={() => setCurrentPage('tracking')}
                  className="hidden sm:flex items-center space-x-1 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full font-bold hover:bg-emerald-100 transition-all"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Track ({orders[0].orderId})</span>
                </button>
              )}

              {/* Questionnaire Assistant Launch button */}
              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="bg-amber-500 text-stone-950 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-amber-400 transition-colors flex items-center space-x-1 shrink-0"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Set Brand Presets</span>
              </button>

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-stone-700 hover:text-emerald-800 hover:bg-stone-50"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 px-4 py-4 space-y-3 shadow-lg">
            <button onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 px-3 rounded hover:bg-stone-50 text-stone-800 font-medium">Home</button>
            <button onClick={() => { setCurrentPage('about'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 px-3 rounded hover:bg-stone-50 text-stone-800 font-medium">About Us</button>
            <button onClick={() => { setCurrentPage('products'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 px-3 rounded hover:bg-stone-50 text-stone-800 font-medium">Our Products</button>
            <button onClick={() => { setCurrentPage('contact'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 px-3 rounded hover:bg-stone-50 text-stone-800 font-medium">Contact Us</button>
            <div className="pt-2 border-t border-stone-100 flex flex-col space-y-2">
              <button 
                onClick={() => { setCurrentPage('admin'); setIsMobileMenuOpen(false); }}
                className="flex items-center justify-center space-x-1.5 py-2.5 px-4 bg-amber-500 text-stone-950 rounded-xl font-bold text-xs"
              >
                <Lock className="w-4 h-4" />
                <span>Secure Admin Panel</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm">
        {toasts.map(t => (
          <div 
            key={t.id} 
            className={`pointer-events-auto p-4 rounded-xl shadow-xl border flex items-center space-x-3 transition-all duration-300 transform translate-y-0 ${
              t.type === 'error' ? 'bg-red-50 text-red-800 border-red-200' : 'bg-emerald-50 text-emerald-900 border-emerald-200'
            }`}
          >
            {t.type === 'error' ? (
              <X className="w-5 h-5 text-red-600 shrink-0" />
            ) : (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            )}
            <p className="text-xs font-semibold">{t.message}</p>
          </div>
        ))}
      </div>

      <main className="flex-grow">
        
        {/* ==================== HOME PAGE VIEW ==================== */}
        {currentPage === 'home' && (
          <div className="animate-fadeIn">
            
            {/* Full-Screen Premium Hero Banner */}
            <div className="relative bg-emerald-950 text-white py-24 md:py-36 overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-25">
                <img 
                  src={settings.heroImage} 
                  alt="Organic Fields" 
                  className="w-full h-full object-cover filter brightness-50"
                />
              </div>
              
              <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -right-32 -top-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  
                  <div className="space-y-6">
                    <span className="inline-flex items-center space-x-1 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-wider uppercase border border-amber-400/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>100% Clean Refinery Sourced</span>
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight uppercase">
                      {settings.tagline}
                    </h1>
                    <p className="text-base text-emerald-100 max-w-xl font-light leading-relaxed">
                      {settings.heroDescription}
                    </p>
                    
                    <div className="pt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                      <button 
                        onClick={() => setCurrentPage('products')}
                        className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                      >
                        <span>{languagePref === 'bilingual' ? 'उत्पाद देखें' : 'View Products Store'}</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setCurrentPage('contact')}
                        className="px-8 py-4 bg-emerald-800/85 hover:bg-emerald-800 text-white font-semibold rounded-xl border border-emerald-600 transition-all flex items-center justify-center space-x-2"
                      >
                        <span>{languagePref === 'bilingual' ? 'वितरक आवेदन' : 'Distributor Request'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-8 border-t border-emerald-900/50 text-center md:text-left">
                      <div>
                        <span className="block text-2xl md:text-3xl font-bold text-amber-300">0%</span>
                        <span className="text-[10px] text-emerald-200">Sulphur Additives</span>
                      </div>
                      <div>
                        <span className="block text-2xl md:text-3xl font-bold text-amber-300">Double</span>
                        <span className="text-[10px] text-emerald-200">Polished Flakes</span>
                      </div>
                      <div>
                        <span className="block text-2xl md:text-3xl font-bold text-amber-300">Moisture</span>
                        <span className="text-[10px] text-emerald-200">Locked Packing</span>
                      </div>
                    </div>
                  </div>

                  {/* Spotlight Box */}
                  <div className="relative flex justify-center">
                    <div className="relative max-w-md w-full bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl overflow-hidden group">
                      <div className="absolute top-0 right-0 bg-amber-500 text-stone-900 text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
                        Premium Quality
                      </div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-emerald-300 text-xs font-bold tracking-widest uppercase">Spotlight Staple</span>
                        <div className="flex space-x-0.5 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </div>
                      </div>
                      
                      <div className="h-48 rounded-2xl overflow-hidden mb-6 bg-stone-100">
                        <img 
                          src="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600" 
                          alt="Spotlight Sugar and Poha"
                          className="w-full h-full object-cover transform hover:scale-105 transition-all duration-500"
                        />
                      </div>
                      
                      <h3 className="text-lg font-serif font-bold text-white">Traditional Medium Poha</h3>
                      <p className="text-xs text-emerald-100 mt-2 mb-4 line-clamp-2">The ultimate breakfast champion of Central India. Light, nutrition-locked, fluffy rice flakes.</p>

                      <button 
                        onClick={() => setCurrentPage('products')}
                        className="w-full bg-white hover:bg-amber-500 text-emerald-950 hover:text-stone-950 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors"
                      >
                        View Products
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {}
            <section className="py-20 bg-stone-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-amber-600 text-xs font-bold tracking-widest uppercase block mb-2">Our Promise of Purity</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">Why Impal Food Stands Supreme</h2>
                  <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                  <p className="text-stone-600 mt-4 leading-relaxed text-sm">
                    Unlike ordinary alternatives, our manufacturing philosophy is focused around strict clean sorting, nutrition preservation, and sustainable local sourcing.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200/50">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-800 mb-6 border border-emerald-100">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-stone-900 mb-2">100% Sulphur Free</h3>
                    <p className="text-xs text-stone-500 leading-relaxed">Our sugar undergoes advanced refinery processes to avoid chemical additives and toxic impurities entirely.</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200/50">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-800 mb-6 border border-emerald-100">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-stone-900 mb-2">Optic Color Sorters</h3>
                    <p className="text-xs text-stone-500 leading-relaxed">Grains are de-stoned, sifted, and vacuum cleared to separate non-standard pieces perfectly.</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200/50">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-800 mb-6 border border-emerald-100">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-stone-900 mb-2">Nutrition-Lock Sealing</h3>
                    <p className="text-xs text-stone-500 leading-relaxed">Multi-layer food-grade packaging preserves native texture and crispness against environmental factors.</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200/50">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-800 mb-6 border border-emerald-100">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-stone-900 mb-2">Zero Hand Touch</h3>
                    <p className="text-xs text-stone-500 leading-relaxed">Fully automated packing and sorting operations in Madhya Pradesh prioritize premium touchless hygiene.</p>
                  </div>
                </div>
              </div>
            </section>

            {}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                  <div className="mb-6 md:mb-0 text-center md:text-left">
                    <span className="text-emerald-700 text-xs font-bold tracking-widest uppercase block mb-1">Naturally Sourced & Healthy</span>
                    <h2 className="text-3xl font-serif font-bold text-stone-950">Our Signature Products</h2>
                  </div>
                  <div className="flex space-x-2 bg-stone-100 p-1 rounded-xl border">
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCategory === 'All' ? 'bg-emerald-800 text-white shadow' : 'text-stone-600'}`}
                    >
                      All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-emerald-800 text-white shadow' : 'text-stone-600'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Developer Alert Widget detailing Admin Capabilities */}
                <div className="mb-10 p-5 bg-amber-50/80 border border-amber-200 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm text-stone-800">
                  <div className="flex items-center space-x-3 text-left">
                    <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl">
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-950 uppercase tracking-wider">Dynamic Store Admin Control Active ⚙️</p>
                      <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                        Authorized admins can hide products, update price listings, rename items, and upload files directly. Ordinary visitors cannot edit details.
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 flex space-x-2">
                    {isAdminAuthenticated ? (
                      <button 
                        onClick={() => { setCurrentPage('admin'); setActiveAdminTab('products'); }}
                        className="px-4 py-2 bg-emerald-800 text-white text-xs font-bold rounded-lg shadow hover:bg-emerald-950"
                      >
                        Launch SKU Panel
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          setAdminUsername('admin');
                          setAdminPassword('impal2026');
                          setCurrentPage('admin');
                          triggerToast("Sandbox logins pre-loaded. Proceed to test admin tools!", "info");
                        }}
                        className="px-4 py-2 bg-amber-500 text-stone-950 text-xs font-bold rounded-lg shadow hover:bg-amber-400"
                      >
                        Login as Admin (Test)
                      </button>
                    )}
                  </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredProducts.slice(0, 8).map((p) => {
                    const availableWeights = p.weights || [p.weight];
                    const selectedWeight = selectedCardWeights[p.id] || p.weight || availableWeights[0];

                    return (
                      <div 
                        key={p.id}
                        className="bg-stone-50 rounded-2xl border border-stone-200/60 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                      >
                        <div className="relative">
                          <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10">
                            {p.tag || p.category}
                          </span>

                          <div className="h-44 overflow-hidden bg-white">
                            <img 
                              src={p.image} 
                              alt={p.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                            />
                          </div>
                        </div>

                        <div className="p-4 flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] font-extrabold text-amber-600 uppercase">{p.category}</span>
                              <div className="flex items-center space-x-1 text-amber-500 text-xs">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="font-bold text-stone-700 text-[11px]">{p.rating}</span>
                              </div>
                            </div>

                            <h3 
                              onClick={() => { setSelectedProductDetails(p); }}
                              className="text-base font-serif font-bold text-stone-900 hover:text-emerald-800 transition-colors cursor-pointer line-clamp-1"
                            >
                              {p.name}
                            </h3>
                            <p className="text-[11px] text-stone-500 mt-2 line-clamp-2 leading-normal">{p.description}</p>
                            
                            {/* Dynamic Weight Selectors */}
                            <div className="mt-3">
                              <span className="block text-[10px] text-stone-400 font-bold mb-1">CHOOSE WEIGHT PACK:</span>
                              <div className="flex flex-wrap gap-1">
                                {availableWeights.map((w) => (
                                  <button
                                    key={w}
                                    type="button"
                                    onClick={() => setSelectedCardWeights(prev => ({ ...prev, [p.id]: w }))}
                                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition-all ${
                                      selectedWeight === w 
                                        ? 'bg-emerald-50 border-emerald-800 text-emerald-900 font-bold' 
                                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                                    }`}
                                  >
                                    {w}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-stone-200/50">
                            <button
                              onClick={() => setSelectedProductDetails(p)}
                              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View Details</span>
                            </button>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center mt-12">
                  <button 
                    onClick={() => setCurrentPage('products')}
                    className="inline-flex items-center space-x-2 text-emerald-800 hover:text-emerald-950 font-bold border-b-2 border-amber-500 pb-1 text-sm tracking-wider uppercase"
                  >
                    <span>View Full Premium Catalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </section>

            {}
            <section className="relative py-20 bg-stone-950 text-white overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" 
                  alt="Factory Plant Floor" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  
                  <div className="space-y-6">
                    <span className="inline-block bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs px-4 py-1 rounded-full uppercase tracking-widest font-bold">
                      Hygienic Sortex Mill Processing
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
                      Fully Automated Aspiration Chambers
                    </h2>
                    <p className="text-stone-300 leading-relaxed font-light text-sm">
                      Our facility implements multi-stage mechanical sifting and de-stoners. High-performance vacuums clear dynamic micro-dust before any paddy is flattened or packed, maintaining flawless food safety benchmarks.
                    </p>

                    <div className="space-y-4 pt-2">
                      <div className="flex items-start space-x-3">
                        <div className="p-1 bg-amber-500 rounded-full text-stone-950 mt-1">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">Optic Laser Sorting Grains</h4>
                          <p className="text-xs text-stone-400">Broken or discolored specs are rejected in real-time, providing highly uniform grains.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="p-1 bg-amber-500 rounded-full text-stone-950 mt-1">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">Triple Filtration Process</h4>
                          <p className="text-xs text-stone-400">Zero bleach or sulphur refining protects natural nutrients and sugar crystal transparency.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={() => setCurrentPage('about')}
                        className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
                      >
                        Tour Our Mill Facilities
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="h-44 rounded-2xl overflow-hidden border border-white/10">
                        <img 
                          src="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=400" 
                          alt="Grain Inspection" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-emerald-900/50 p-6 rounded-2xl border border-emerald-800 text-center">
                        <span className="block text-3xl font-serif font-bold text-amber-300">Clean</span>
                        <span className="text-[10px] text-stone-300 mt-1 block uppercase tracking-wider">Hygienic Labs</span>
                      </div>
                    </div>

                    <div className="space-y-4 pt-8">
                      <div className="bg-amber-50/10 p-6 rounded-2xl border border-white/10 text-center text-stone-100">
                        <span className="block text-3xl font-serif font-bold text-amber-400">FSSAI</span>
                        <span className="text-[10px] text-stone-300 mt-1 block uppercase tracking-wider">Approved Protocols</span>
                      </div>
                      <div className="h-44 rounded-2xl overflow-hidden border border-white/10">
                        <img 
                          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400" 
                          alt="Clean Packaging" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* B2B Regional Partnerships */}
            <section className="py-20 bg-amber-50/70 border-y border-amber-100/60">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <span className="text-amber-700 text-xs font-bold tracking-widest uppercase block">National Wholesale Super Stockists</span>
                <h2 className="text-3xl font-serif font-bold text-stone-900">Partner with India's Elite Grain Wholesalers</h2>
                <p className="text-stone-600 max-w-2xl mx-auto text-sm leading-relaxed">
                  We invite super-stockists and regional retail distributors from MP, Maharashtra, and beyond to leverage our consistent premium supply lines, competitive profit shares, and verified brand trust.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                  <button 
                    onClick={() => { setContactType('Distributor'); setCurrentPage('contact'); }}
                    className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
                  >
                    Apply for Distributorship
                  </button>
                  <a 
                    href={`https://wa.me/${settings.whatsappNumber}?text=Hi Impal Food team, interested in distributorship.`}
                    target="_blank" 
                    rel="noreferrer"
                    className="px-6 py-3 bg-white text-stone-800 font-bold rounded-xl border border-stone-300 shadow-sm flex items-center justify-center space-x-2 text-xs uppercase tracking-wider"
                  >
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>Talk with Sales</span>
                  </a>
                </div>
              </div>
            </section>

            {}
            <section className="py-20 bg-stone-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-amber-600 text-xs font-bold tracking-widest uppercase block mb-1">Our Believers</span>
                  <h2 className="text-3xl font-serif font-bold text-stone-900">Loved by Housewives & Distributors</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((t) => (
                    <div key={t.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200/50 flex flex-col justify-between">
                      <div>
                        <div className="flex space-x-0.5 text-amber-500 mb-4">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-stone-600 italic leading-relaxed">"{t.quote}"</p>
                      </div>
                      <div className="mt-6 flex items-center space-x-3 pt-4 border-t border-stone-100">
                        <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center text-xs">
                          {t.name[0]}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-stone-900">{t.name}</h4>
                          <span className="text-[10px] text-stone-400">{t.role} - {t.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQs Section */}
            <section className="py-20 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <span className="text-emerald-700 text-xs font-bold tracking-widest uppercase block mb-1">Got Questions?</span>
                  <h2 className="text-3xl font-serif font-bold text-stone-900">Frequently Asked Queries</h2>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={faq.id} className="border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full flex justify-between items-center p-5 text-left font-semibold text-stone-900 hover:bg-stone-50 transition-colors text-sm"
                      >
                        <span>{faq.question}</span>
                        {activeFaq === idx ? (
                          <ChevronUp className="w-4 h-4 text-emerald-800" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-emerald-800" />
                        )}
                      </button>

                      {activeFaq === idx && (
                        <div className="p-5 bg-stone-50 border-t border-stone-100 text-xs text-stone-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Instagram Live Gallery Feed Section */}
            <section className="py-16 bg-stone-50 border-t border-stone-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <span className="text-amber-600 text-xs font-bold uppercase tracking-widest block">Social Connection</span>
                <h3 className="text-2xl font-serif font-bold text-stone-900">Follow Our Live Production Feed</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {gallery.slice(0, 4).map((item) => (
                    <div key={item.id} className="h-44 rounded-2xl overflow-hidden relative group cursor-pointer border border-stone-200">
                      <img src={item.image} alt="Insta" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                      <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold uppercase tracking-wider">@impalfood</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================== ABOUT US VIEW ==================== */}
        {currentPage === 'about' && (
          <div className="animate-fadeIn">
            
            <div className="bg-emerald-900 text-white py-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-15">
                <img 
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200" 
                  alt="Fields" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 max-w-4xl mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-serif font-bold">About IMPAL</h1>
                <p className="text-xs text-emerald-100 mt-2 max-w-xl mx-auto">Purity, Trust &amp; Quality — bridging India&apos;s finest fields with your modern kitchen.</p>
              </div>
            </div>

            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <span className="text-amber-600 text-xs font-bold uppercase tracking-wider block mb-2">Our Story</span>
                    <h2 className="text-3xl font-serif font-bold text-stone-900">{settings.aboutHeading}</h2>
                    <p className="text-stone-600 leading-relaxed text-sm whitespace-pre-line">
                      {settings.aboutP1}
                    </p>
                    <p className="text-stone-600 leading-relaxed text-sm whitespace-pre-line">
                      {settings.aboutP2}
                    </p>
                    <p className="text-stone-600 leading-relaxed text-sm whitespace-pre-line">
                      {settings.aboutP3}
                    </p>

                    <div className="grid grid-cols-2 gap-6 border-t pt-6">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm">Untouched-by-Hand Packaging</h4>
                        <p className="text-xs text-stone-400 mt-1">Modern, automated pouching with zero manual contact for full hygiene.</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm">Rigorous Quality Checks</h4>
                        <p className="text-xs text-stone-400 mt-1">Sparkling sugar crystals and authentic, light poha — every single batch.</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="rounded-3xl overflow-hidden shadow-xl border border-stone-200">
                      <img 
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600" 
                        alt="Hygienic Packing Line" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-emerald-800 text-white p-5 rounded-2xl shadow-lg border border-emerald-600 max-w-xs">
                      <p className="text-xs text-emerald-300 uppercase tracking-widest font-extrabold mb-1">Our Belief</p>
                      <p className="text-xs leading-relaxed font-light">
                        The most essential ingredients in your kitchen deserve the highest standard of care.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================== PRODUCTS PAGE VIEW ==================== */}
        {currentPage === 'products' && (
          <div className="animate-fadeIn py-12 bg-stone-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 mb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  <div>
                    <h1 className="text-3xl font-serif font-bold text-stone-900">Explore Premium Staples</h1>
                    <p className="text-xs text-stone-400 mt-1">Hygienic, premium sorting crystal sugars and farm-fresh flaked poha types.</p>
                  </div>

                  <div className="relative max-w-md w-full">
                    <Search className="absolute left-3.5 top-3 text-stone-400 w-4 h-4" />
                    <input 
                      type="text" 
                      placeholder="Search crystal sugar, organic brown sugar, thin poha..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-800 outline-none"
                    />
                  </div>

                </div>

                <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-stone-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mr-2 flex items-center">
                    <Filter className="w-3.5 h-3.5 mr-1" />
                    <span>Filter Row:</span>
                  </span>
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${selectedCategory === 'All' ? 'bg-emerald-800 text-white shadow' : 'bg-stone-50 text-stone-600'}`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${selectedCategory === cat ? 'bg-emerald-800 text-white shadow' : 'bg-stone-50 text-stone-600'}`}
                    >
                      {cat}
                    </button>
                  ))}
                  <span className="text-xs text-stone-400 ml-auto">
                    Active Catalog Counts: {filteredProducts.length} Listings
                  </span>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border max-w-md mx-auto">
                  <span className="inline-block p-4 bg-amber-50 rounded-full text-amber-600 mb-4">
                    <Search className="w-8 h-8" />
                  </span>
                  <h3 className="text-base font-bold text-stone-900">No SKUs Match Criteria</h3>
                  <p className="text-xs text-stone-500 mt-2">Adjust filter settings or check admin dashboard visibility toggles.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((p) => {
                    const availableWeights = p.weights || [p.weight];
                    const selectedWeight = selectedCardWeights[p.id] || p.weight || availableWeights[0];

                    return (
                      <div 
                        key={p.id}
                        className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                      >
                        <div className="relative">
                          <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest z-10">
                            {p.tag || p.category}
                          </span>
                          
                          <div className="h-56 overflow-hidden bg-white">
                            <img 
                              src={p.image} 
                              alt={p.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                            />
                          </div>
                        </div>

                        <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                          <div>
                            <div className="flex justify-between items-center text-xs mb-2">
                              <span className="font-extrabold text-amber-600 uppercase tracking-wider">{p.category}</span>
                              <div className="flex items-center space-x-1 text-amber-500 font-bold">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <span className="text-stone-700">{p.rating}</span>
                              </div>
                            </div>

                            <h3 
                              onClick={() => setSelectedProductDetails(p)}
                              className="text-lg font-serif font-bold text-stone-900 hover:text-emerald-800 cursor-pointer transition-colors"
                            >
                              {p.name}
                            </h3>
                            <p className="text-xs text-stone-500 leading-relaxed line-clamp-3 mt-2">{p.description}</p>
                            
                            <div className="mt-4">
                              <span className="text-[10px] font-bold text-stone-400 block mb-1">Available Weight Options:</span>
                              <div className="flex flex-wrap gap-1">
                                {availableWeights.map((w) => (
                                  <button
                                    key={w}
                                    type="button"
                                    onClick={() => setSelectedCardWeights(prev => ({ ...prev, [p.id]: w }))}
                                    className={`px-2.5 py-1 rounded text-xs font-semibold border transition-all ${
                                      selectedWeight === w 
                                        ? 'bg-emerald-50 border-emerald-800 text-emerald-900 font-bold' 
                                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                                    }`}
                                  >
                                    {w}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-stone-100">
                            <button
                              onClick={() => setSelectedProductDetails(p)}
                              className="w-full px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View Details</span>
                            </button>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>
        )}

        {/* ==================== CONTACT & DISTRIBUTOR ENQUIRY ==================== */}
        {currentPage === 'contact' && (
          <div className="animate-fadeIn py-12 bg-stone-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-amber-600 text-xs font-bold uppercase tracking-widest block mb-2">Connect with Impal Food</span>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">Reach Our Sales Team</h1>
                <p className="text-stone-500 mt-2 text-sm leading-relaxed">Whether you are an individual retail client or looking for regional statewide distribution pipelines.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* Visual Location Info */}
                <div className="bg-emerald-900 text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
                  
                  <div className="space-y-6">
                    <h3 className="text-xl font-serif font-bold text-amber-300">Registered Office</h3>
                    <p className="text-xs text-emerald-100 leading-relaxed font-light">
                      {settings.address}
                    </p>

                    <div className="space-y-4 pt-4 text-xs">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                        <span>{settings.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                        <span>{settings.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-amber-400 shrink-0" />
                        <span>www.impalfood.com</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-950 p-4 rounded-xl border border-emerald-800">
                    <h4 className="font-bold text-amber-300 text-[11px] uppercase tracking-wider mb-1">Secure SQL Sockets Ready</h4>
                    <p className="text-[10px] text-stone-300 leading-normal">
                      Submissions on this form immediately update the secure Leads dashboard in real-time. Try submitting a test lead!
                    </p>
                  </div>
                </div>

                {/* Form Elements */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200">
                  <div className="flex border-b border-stone-200 mb-6 pb-2">
                    <button
                      type="button"
                      onClick={() => setContactType('Inquiry')}
                      className={`pb-3 pr-6 text-xs font-bold uppercase tracking-wider ${contactType === 'Inquiry' ? 'text-emerald-800 border-b-2 border-amber-500' : 'text-stone-500'}`}
                    >
                      General Staple Inquiry
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactType('Distributor')}
                      className={`pb-3 px-6 text-xs font-bold uppercase tracking-wider ${contactType === 'Distributor' ? 'text-emerald-800 border-b-2 border-amber-500' : 'text-stone-500'}`}
                    >
                      Distributor Business Application
                    </button>
                  </div>

                  <form onSubmit={handleInquirySubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-2">Contact Name *</label>
                        <input 
                          type="text" required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-800"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-2">Firm / Shop Name (Optional)</label>
                        <input 
                          type="text" 
                          value={contactBusiness}
                          onChange={(e) => setContactBusiness(e.target.value)}
                          placeholder="e.g. Sharma Groceries Pvt Ltd"
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-800"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-2">Phone Number *</label>
                        <input 
                          type="tel" required
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="Contact Mobile Number"
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-800"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-2">Email Address *</label>
                        <input 
                          type="email" required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="email@example.com"
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-800"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-2">City</label>
                        <input 
                          type="text" 
                          value={contactCity}
                          onChange={(e) => setContactCity(e.target.value)}
                          placeholder="e.g. Indore"
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-800"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-2">State</label>
                        <input 
                          type="text" 
                          value={contactState}
                          onChange={(e) => setContactState(e.target.value)}
                          placeholder="e.g. Madhya Pradesh"
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-2">Detailed Enquiry Message</label>
                      <textarea 
                        rows="3"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Detail volume requirements, packaging questions..."
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-800"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-950 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow"
                    >
                      Submit Secure Lead
                    </button>
                  </form>
                </div>

              </div>

              {/* Dynamic Google Maps Segment */}
              <div className="mt-12 bg-white p-4 rounded-3xl border border-stone-200 shadow-sm">
                <h3 className="text-sm font-serif font-bold text-stone-900 mb-4 px-2">Warehouse & Mill Plant Location</h3>
                <div className="h-64 rounded-2xl overflow-hidden bg-stone-100 relative">
                  <iframe 
                    title="Warehouse Map"
                    src={settings.googleMapsEmbed}
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================== SECURE LOCKED ADMIN SYSTEM ==================== */}
        {currentPage === 'admin' && (
          <div className="animate-fadeIn py-12 bg-stone-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {!isAdminAuthenticated ? (
                /* Admin Login Portal Details */
                <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-md border border-stone-200 text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 mx-auto mb-6 border border-amber-200">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h1 className="text-xl font-serif font-bold text-stone-900">Secure Admin Command Gate</h1>
                  <p className="text-xs text-stone-400 mt-2 mb-6">Modify live products, toggle prices, adjust SEO configurations, and manage categories.</p>
                  
                  <div className="bg-amber-50 p-4 rounded-xl text-left text-xs text-stone-800 mb-6 border border-amber-200">
                    <p className="font-bold mb-1">🔑 Dev Credentials Locked Check:</p>
                    <p>Username: <code className="bg-white px-1 py-0.5 rounded font-mono font-bold">admin</code></p>
                    <p>Password: <code className="bg-white px-1 py-0.5 rounded font-mono font-bold">impal2026</code></p>
                  </div>

                  {adminError && (
                    <div className="bg-red-50 text-red-800 text-xs p-3.5 rounded-xl border border-red-200 mb-4 font-semibold">
                      {adminError}
                    </div>
                  )}

                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div className="text-left">
                      <label className="block text-[10px] font-bold uppercase text-stone-600 mb-1">Username</label>
                      <input 
                        type="text"
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-[10px] font-bold uppercase text-stone-600 mb-1">Password</label>
                      <input 
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-3 bg-emerald-800 hover:bg-emerald-950 text-white font-bold rounded-xl text-xs uppercase"
                    >
                      Authenticate Securely
                    </button>
                  </form>
                </div>
              ) : (
                
                /* Active Verified Admin Dashboard View */
                <div className="space-y-8 animate-fadeIn">
                  
                  {/* Dashboard Header Bar */}
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 animate-pulse"></span>
                        <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">Authorized Console</span>
                      </div>
                      <h1 className="text-3xl font-serif font-bold text-stone-900 mt-1">Staples Command Hub</h1>
                      <p className="text-xs text-stone-400">Updates here are saved immediately in memory and will re-render your storefront dynamically.</p>
                    </div>

                    <button 
                      onClick={handleAdminLogout}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 border border-red-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out Hub</span>
                    </button>
                  </div>

                  {}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* Navigation Sidebar */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 space-y-1 h-fit">
                      <span className="block px-4 py-2 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Overview</span>

                      <button
                        onClick={() => setActiveAdminTab('dashboard')}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center space-x-2 ${activeAdminTab === 'dashboard' ? 'bg-emerald-800 text-white shadow' : 'text-stone-600 hover:bg-stone-50'}`}
                      >
                        <BarChart2 className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>

                      <span className="block px-4 py-2 pt-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Configure Stores</span>

                      <button
                        onClick={() => setActiveAdminTab('products')}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center space-x-2 ${activeAdminTab === 'products' ? 'bg-emerald-800 text-white shadow' : 'text-stone-600 hover:bg-stone-50'}`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Inventory Controls</span>
                      </button>

                      <button 
                        onClick={() => setActiveAdminTab('categories')}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center space-x-2 ${activeAdminTab === 'categories' ? 'bg-emerald-800 text-white shadow' : 'text-stone-600 hover:bg-stone-50'}`}
                      >
                        <Filter className="w-4 h-4" />
                        <span>Categories</span>
                      </button>

                      <button 
                        onClick={() => setActiveAdminTab('gallery')}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center space-x-2 ${activeAdminTab === 'gallery' ? 'bg-emerald-800 text-white shadow' : 'text-stone-600 hover:bg-stone-50'}`}
                      >
                        <ImageIcon className="w-4 h-4" />
                        <span>Landscape Gallery</span>
                      </button>

                      <span className="block px-4 py-2 pt-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Website Content</span>

                      <button 
                        onClick={() => setActiveAdminTab('homepage')}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center space-x-2 ${activeAdminTab === 'homepage' ? 'bg-emerald-800 text-white shadow' : 'text-stone-600 hover:bg-stone-50'}`}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Hero & Banners</span>
                      </button>

                      <button 
                        onClick={() => setActiveAdminTab('testimonials')}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center space-x-2 ${activeAdminTab === 'testimonials' ? 'bg-emerald-800 text-white shadow' : 'text-stone-600 hover:bg-stone-50'}`}
                      >
                        <Star className="w-4 h-4" />
                        <span>Testimonials</span>
                      </button>

                      <button 
                        onClick={() => setActiveAdminTab('enquiries')}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center space-x-2 ${activeAdminTab === 'enquiries' ? 'bg-emerald-800 text-white shadow' : 'text-stone-600 hover:bg-stone-50'}`}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Customer Leads ({enquiries.length})</span>
                      </button>

                      <span className="block px-4 py-2 pt-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Advanced Core</span>

                      <button 
                        onClick={() => setActiveAdminTab('seo')}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center space-x-2 ${activeAdminTab === 'seo' ? 'bg-emerald-800 text-white shadow' : 'text-stone-600 hover:bg-stone-50'}`}
                      >
                        <Globe className="w-4 h-4" />
                        <span>SEO & Metatags</span>
                      </button>

                      <button 
                        onClick={() => setActiveAdminTab('analytics')}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center space-x-2 ${activeAdminTab === 'analytics' ? 'bg-emerald-800 text-white shadow' : 'text-stone-600 hover:bg-stone-50'}`}
                      >
                        <BarChart2 className="w-4 h-4" />
                        <span>Site Analytics</span>
                      </button>
                    </div>

                    {/* Active Tab Panel Grid Area */}
                    <div className="lg:col-span-3 space-y-8">

                      {/* SUB-TAB: DASHBOARD OVERVIEW */}
                      {activeAdminTab === 'dashboard' && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Products</span>
                                <ShoppingBag className="w-4 h-4 text-emerald-700" />
                              </div>
                              <span className="block text-2xl font-serif font-black text-stone-900">{analytics.totalProducts}</span>
                              <span className="text-[10px] text-stone-400">{analytics.visibleProducts} visible on site</span>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Categories</span>
                                <Filter className="w-4 h-4 text-amber-600" />
                              </div>
                              <span className="block text-2xl font-serif font-black text-stone-900">{categories.length}</span>
                              <span className="text-[10px] text-stone-400">{analytics.featuredProducts} featured products</span>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Enquiries</span>
                                <MessageSquare className="w-4 h-4 text-blue-600" />
                              </div>
                              <span className="block text-2xl font-serif font-black text-stone-900">{enquiries.length}</span>
                              <span className="text-[10px] text-stone-400">{analytics.pendingEnquiries} awaiting reply</span>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">Low Stock</span>
                                <TrendingUp className="w-4 h-4 text-rose-600" />
                              </div>
                              <span className="block text-2xl font-serif font-black text-stone-900">{analytics.lowStock.length}</span>
                              <span className="text-[10px] text-stone-400">SKUs below 50 units</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                              <h3 className="text-sm font-bold text-stone-900 mb-4">Products by Category</h3>
                              {Object.keys(analytics.productsByCategory).length === 0 ? (
                                <p className="text-xs text-stone-400 py-6 text-center">No products yet.</p>
                              ) : (
                                <ul className="space-y-3">
                                  {Object.entries(analytics.productsByCategory).map(([cat, count]) => (
                                    <li key={cat} className="flex items-center justify-between text-xs">
                                      <span className="flex items-center space-x-2">
                                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">{cat[0]}</span>
                                        <span className="text-stone-700 truncate">{cat}</span>
                                      </span>
                                      <span className="font-bold text-amber-700">{count} products</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                              <h3 className="text-sm font-bold text-stone-900 mb-4">Recent Enquiries</h3>
                              {enquiries.length === 0 ? (
                                <p className="text-xs text-stone-400 py-6 text-center">No enquiries yet.</p>
                              ) : (
                                <ul className="space-y-2">
                                  {enquiries.slice(0, 5).map(en => (
                                    <li key={en.id} className="flex items-center justify-between text-xs p-2 bg-stone-50 rounded-lg">
                                      <div className="min-w-0">
                                        <span className="font-bold text-stone-800 block truncate">{en.name}</span>
                                        <span className="text-stone-400 text-[10px]">{en.type} · {en.date}</span>
                                      </div>
                                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${en.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>{en.status}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>

                          {analytics.lowStock.length > 0 && (
                            <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl">
                              <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-3 flex items-center space-x-2">
                                <Info className="w-4 h-4" />
                                <span>Low Stock Alerts</span>
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {analytics.lowStock.map(p => (
                                  <div key={p.id} className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-rose-100">
                                    <span className="truncate">{p.name}</span>
                                    <span className="font-bold text-rose-700">{p.stock} left</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* SUB-TAB: PRODUCTS CRUD INVENTORY */}
                      {activeAdminTab === 'products' && (
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200 space-y-8">
                          
                          {/* Create/Edit Form */}
                          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                            <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center space-x-2">
                              {editingProductId ? <Edit className="w-4 h-4 text-amber-500" /> : <Plus className="w-4 h-4 text-emerald-800" />}
                              <span>{editingProductId ? "Modify Stock Listing" : "Upload New Product SKU"}</span>
                            </h3>

                            <form onSubmit={handleSaveProduct} className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-stone-600 mb-1">Product Title *</label>
                                  <input 
                                    type="text" required
                                    value={prodForm.name}
                                    onChange={(e) => setProdForm({...prodForm, name: e.target.value})}
                                    placeholder="e.g. Impal Premium Crystal Sugar"
                                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-stone-600 mb-1">Category Category *</label>
                                  <select 
                                    value={prodForm.category}
                                    onChange={(e) => setProdForm({...prodForm, category: e.target.value})}
                                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none"
                                  >
                                    {categories.map(c => (
                                      <option key={c} value={c}>{c}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-stone-600 mb-1">Packaging Sizes (Comma Separated) *</label>
                                  <input 
                                    type="text" required
                                    value={prodForm.weightOptionsInput}
                                    onChange={(e) => setProdForm({...prodForm, weightOptionsInput: e.target.value})}
                                    placeholder="e.g. 500g, 1kg, 5kg"
                                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-stone-600 mb-1">Available Units Stock *</label>
                                  <input 
                                    type="number" required
                                    value={prodForm.stock}
                                    onChange={(e) => setProdForm({...prodForm, stock: e.target.value})}
                                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-stone-600 mb-1">Active Store Price (INR) *</label>
                                  <input 
                                    type="number" required
                                    value={prodForm.price}
                                    onChange={(e) => setProdForm({...prodForm, price: e.target.value})}
                                    placeholder="Enter Price Amount"
                                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none font-bold text-emerald-800"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-stone-600 mb-1">Strike-Through Retail Price (Optional)</label>
                                  <input 
                                    type="number"
                                    value={prodForm.oldPrice}
                                    onChange={(e) => setProdForm({...prodForm, oldPrice: e.target.value})}
                                    placeholder="e.g. 75"
                                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none text-stone-400"
                                  />
                                </div>

                                <div className="md:col-span-2">
                                  <label className="block text-xs font-bold text-stone-600 mb-1">Product Photos * <span className="text-stone-400 font-normal">(add multiple — first one is the cover)</span></label>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-4 border border-stone-200 rounded-xl">
                                    <div>
                                      <span className="block text-[11px] font-bold text-stone-500 mb-1">Option A: Upload from device (multiple)</span>
                                      <label className="flex flex-col items-center justify-center py-4 px-3 border border-dashed border-stone-300 rounded-xl cursor-pointer hover:bg-stone-50 text-center">
                                        <Upload className="w-8 h-8 text-stone-400 mb-2" />
                                        <span className="text-xs font-semibold text-emerald-800">Select Photos</span>
                                        <span className="text-[10px] text-stone-400 mt-0.5">You can pick several at once</span>
                                        <input 
                                          type="file" 
                                          accept="image/*" 
                                          multiple
                                          className="hidden" 
                                          onChange={(e) => handlePhotoUpload(e, 'product')}
                                        />
                                      </label>
                                    </div>
                                    <div>
                                      <span className="block text-[11px] font-bold text-stone-500 mb-1">Option B: Add by photo URL</span>
                                      <div className="flex gap-2">
                                        <input 
                                          type="text"
                                          value={prodForm.imageUrlInput || ''}
                                          onChange={(e) => setProdForm({...prodForm, imageUrlInput: e.target.value})}
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                              e.preventDefault();
                                              addProductImageUrl(prodForm.imageUrlInput);
                                              setProdForm(prev => ({ ...prev, imageUrlInput: '' }));
                                            }
                                          }}
                                          placeholder="https://images.unsplash.com/..."
                                          className="flex-grow px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs outline-none"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => {
                                            addProductImageUrl(prodForm.imageUrlInput);
                                            setProdForm(prev => ({ ...prev, imageUrlInput: '' }));
                                          }}
                                          className="px-3 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-950 shrink-0"
                                        >
                                          Add
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {(prodForm.images && prodForm.images.length > 0) && (
                                    <div className="mt-3">
                                      <span className="block text-[11px] font-bold text-stone-500 mb-2">{prodForm.images.length} photo(s) attached</span>
                                      <div className="flex flex-wrap gap-3">
                                        {prodForm.images.map((img, idx) => (
                                          <div key={`${idx}-${img.slice(0, 24)}`} className="relative group">
                                            <img src={img} alt={`Photo ${idx + 1}`} className="w-20 h-20 rounded-lg object-cover border border-stone-200 bg-white" />
                                            {idx === 0 && (
                                              <span className="absolute bottom-0 inset-x-0 bg-emerald-800/90 text-white text-[8px] font-bold uppercase text-center py-0.5 rounded-b-lg">Cover</span>
                                            )}
                                            <button
                                              type="button"
                                              onClick={() => removeProductImage(idx)}
                                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700"
                                              title="Remove photo"
                                            >
                                              <X className="w-3 h-3" />
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-xs font-bold text-stone-600 mb-1">Card Tag / Badge</label>
                                  <input 
                                    type="text"
                                    value={prodForm.tag}
                                    onChange={(e) => setProdForm({...prodForm, tag: e.target.value})}
                                    placeholder="e.g. Best Seller, Organic"
                                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none"
                                  />
                                </div>

                                <div className="flex space-x-4 items-center pt-6">
                                  <div className="flex items-center space-x-1">
                                    <input 
                                      type="checkbox"
                                      checked={prodForm.isFeatured}
                                      onChange={(e) => setProdForm({...prodForm, isFeatured: e.target.checked})}
                                      id="isFeatured"
                                      className="rounded text-emerald-800"
                                    />
                                    <label htmlFor="isFeatured" className="text-xs font-bold text-stone-600">Spotlight Feature</label>
                                  </div>

                                  <div className="flex items-center space-x-1">
                                    <input 
                                      type="checkbox"
                                      checked={prodForm.isVisible}
                                      onChange={(e) => setProdForm({...prodForm, isVisible: e.target.checked})}
                                      id="isVisible"
                                      className="rounded text-emerald-800"
                                    />
                                    <label htmlFor="isVisible" className="text-xs font-bold text-stone-600">Visible to Public</label>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-stone-600 mb-1">Description Paragraph</label>
                                <textarea 
                                  value={prodForm.description}
                                  onChange={(e) => setProdForm({...prodForm, description: e.target.value})}
                                  rows="2"
                                  placeholder="Describe the packaging standard or parboiled parameters..."
                                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none"
                                ></textarea>
                              </div>

                              <div className="flex space-x-2">
                                <button 
                                  type="submit"
                                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-950 text-white rounded-lg text-xs font-bold"
                                >
                                  {editingProductId ? "Update Live SKU" : "Register SKU"}
                                </button>
                                {editingProductId && (
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      setEditingProductId(null);
                                      setProdForm({ 
                                        name: '', category: categories[0] || 'Sugar', weight: '1kg', weightOptionsInput: '500g, 1kg, 5kg',
                                        description: '', price: '', oldPrice: '', stock: 100, image: '', images: [], isFeatured: false, isVisible: true, tag: '' 
                                      });
                                    }}
                                    className="px-5 py-2 bg-stone-300 text-stone-700 rounded-lg text-xs font-bold hover:bg-stone-400"
                                  >
                                    Cancel
                                  </button>
                                )}
                              </div>
                            </form>
                          </div>

                          {/* Inventory List */}
                          <div>
                            <h3 className="text-sm font-bold text-stone-900 mb-4">Live Inventory Registry</h3>
                            <div className="overflow-x-auto border border-stone-200 rounded-2xl">
                              <table className="w-full text-left text-xs text-stone-700">
                                <thead className="bg-stone-50 border-b border-stone-200 uppercase tracking-wider text-[10px] font-bold">
                                  <tr>
                                    <th className="p-4">SKU Photo</th>
                                    <th className="p-4">Product Name</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Stock level</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Visibility</th>
                                    <th className="p-4 text-center">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-200">
                                  {products.map((p) => (
                                    <tr key={p.id} className="hover:bg-stone-50">
                                      <td className="p-4">
                                        <img src={p.image} alt="SKU" className="w-10 h-10 rounded object-cover border" />
                                      </td>
                                      <td className="p-4 font-bold text-stone-900">{p.name}</td>
                                      <td className="p-4 font-semibold">{p.category}</td>
                                      <td className="p-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                          {p.stock} units
                                        </span>
                                      </td>
                                      <td className="p-4 font-bold text-emerald-800">₹{p.price}</td>
                                      <td className="p-4">
                                        {p.isVisible !== false ? (
                                          <span className="text-xs text-green-700 font-semibold flex items-center space-x-1">
                                            <Eye className="w-3.5 h-3.5" /> <span>Visible</span>
                                          </span>
                                        ) : (
                                          <span className="text-xs text-stone-400 font-semibold flex items-center space-x-1">
                                            <EyeOff className="w-3.5 h-3.5" /> <span>Hidden</span>
                                          </span>
                                        )}
                                      </td>
                                      <td className="p-4">
                                        <div className="flex justify-center space-x-1.5">
                                          <button 
                                            onClick={() => startEditProduct(p)}
                                            className="p-1.5 bg-amber-50 text-amber-600 rounded border hover:bg-amber-100"
                                            title="Modify Stock"
                                          >
                                            <Edit className="w-3.5 h-3.5" />
                                          </button>
                                          <button 
                                            onClick={() => deleteProduct(p.id)}
                                            className="p-1.5 bg-red-50 text-red-600 rounded border hover:bg-red-100"
                                            title="Delete SKU"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                        </div>
                      )}

                      {/* SUB-TAB: CATEGORIES SETUP */}
                      {activeAdminTab === 'categories' && (
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200 space-y-6">
                          <h3 className="text-base font-bold text-stone-900">Manage Dynamic Product Categories</h3>
                          
                          <form onSubmit={handleAddCategory} className="flex gap-2">
                            <input 
                              type="text"
                              value={newCategoryInput}
                              onChange={(e) => setNewCategoryInput(e.target.value)}
                              placeholder="e.g. Spices, Ghee, Flour"
                              className="px-4 py-2 bg-stone-50 border rounded-xl text-xs flex-grow outline-none"
                            />
                            <button type="submit" className="px-5 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold">
                              Add Category
                            </button>
                          </form>

                          <div className="space-y-2 mt-4">
                            <span className="text-[10px] text-stone-400 font-bold block">ACTIVE LISTS:</span>
                            {categories.map(c => (
                              <div key={c} className="flex items-center justify-between p-3 bg-stone-50 border rounded-xl">
                                <span className="text-xs font-bold text-stone-900">{c}</span>
                                <button 
                                  onClick={() => deleteCategory(c)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB: EDITABLE LANDSCAPE GALLERY */}
                      {activeAdminTab === 'gallery' && (
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200 space-y-8">
                          
                          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                            <h3 className="text-base font-bold text-stone-900 mb-4">Add Mill Production Snaps</h3>
                            <form onSubmit={handleAddGalleryItem} className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-stone-600 mb-1">Snap Title *</label>
                                  <input 
                                    type="text" required
                                    value={newGalleryTitle}
                                    onChange={(e) => setNewGalleryTitle(e.target.value)}
                                    placeholder="e.g. Optical Graders in Action"
                                    className="w-full px-3 py-2 bg-white border rounded-lg text-xs outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-stone-600 mb-1">Category Category</label>
                                  <select 
                                    value={newGalleryCategory}
                                    onChange={(e) => setNewGalleryCategory(e.target.value)}
                                    className="w-full px-3 py-2 bg-white border rounded-lg text-xs outline-none"
                                  >
                                    <option value="Factory">Factory</option>
                                    <option value="Infrastructure">Infrastructure</option>
                                    <option value="Farming">Farming</option>
                                  </select>
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-stone-600 mb-1">Description</label>
                                <input 
                                  type="text"
                                  value={newGalleryDesc}
                                  onChange={(e) => setNewGalleryDesc(e.target.value)}
                                  className="w-full px-3 py-2 bg-white border rounded-lg text-xs outline-none"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-4 border border-stone-200 rounded-xl">
                                <div>
                                  <span className="block text-[11px] font-bold text-stone-500 mb-1">Select File</span>
                                  <label className="flex flex-col items-center justify-center py-4 px-3 border border-dashed rounded-xl cursor-pointer hover:bg-stone-50 text-center">
                                    <Upload className="w-8 h-8 text-stone-400 mb-2" />
                                    <span className="text-xs font-semibold text-emerald-800">Buffer Snap</span>
                                    <input 
                                      type="file" 
                                      className="hidden" 
                                      onChange={(e) => handlePhotoUpload(e, 'gallery')}
                                    />
                                  </label>
                                </div>
                                <div>
                                  <span className="block text-[11px] font-bold text-stone-500 mb-1">URL Preset</span>
                                  <input 
                                    type="text"
                                    value={newGalleryImage}
                                    onChange={(e) => setNewGalleryImage(e.target.value)}
                                    placeholder="Direct URL link"
                                    className="w-full px-3 py-2.5 bg-stone-50 border rounded-lg text-xs outline-none"
                                  />
                                </div>
                              </div>

                              <button type="submit" className="px-5 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold">
                                Add to Gallery
                              </button>
                            </form>
                          </div>

                          {/* List */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {gallery.map(g => (
                              <div key={g.id} className="p-3 bg-stone-50 border rounded-xl flex items-center justify-between gap-4">
                                <div className="flex items-center space-x-3">
                                  <img src={g.image} alt="Sourcing" className="w-12 h-12 rounded object-cover border" />
                                  <div>
                                    <h5 className="font-bold text-stone-900 text-xs">{g.title}</h5>
                                    <span className="text-[10px] text-emerald-800 font-bold uppercase">{g.category}</span>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => deleteGalleryItem(g.id)}
                                  className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>

                        </div>
                      )}

                      {/* SUB-TAB: HERO BANNER MANAGEMENT */}
                      {activeAdminTab === 'homepage' && (
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200 space-y-6">
                          <h3 className="text-base font-bold text-stone-900">Configure Homepage, About & Contact Info</h3>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold text-stone-600 mb-1">Brand Name</label>
                              <input
                                type="text"
                                value={settings.brandName}
                                onChange={(e) => setSettings({...settings, brandName: e.target.value})}
                                className="w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-xs outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-stone-600 mb-1">Hero Banner Tagline</label>
                              <input
                                type="text"
                                value={settings.tagline}
                                onChange={(e) => setSettings({...settings, tagline: e.target.value})}
                                className="w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-xs outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-stone-600 mb-1">Hero Description Paragraph</label>
                              <textarea
                                rows="4"
                                value={settings.heroDescription}
                                onChange={(e) => setSettings({...settings, heroDescription: e.target.value})}
                                className="w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-xs outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-stone-600 mb-1">Hero Backdrop Sourcing Link</label>
                              <input
                                type="text"
                                value={settings.heroImage}
                                onChange={(e) => setSettings({...settings, heroImage: e.target.value})}
                                className="w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-xs outline-none"
                              />
                            </div>

                            <div className="pt-4 border-t border-stone-200">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">About Page Content</h4>
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-xs font-bold text-stone-600 mb-1">About Heading</label>
                                  <input
                                    type="text"
                                    value={settings.aboutHeading}
                                    onChange={(e) => setSettings({...settings, aboutHeading: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-xs outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-stone-600 mb-1">About Paragraph 1</label>
                                  <textarea
                                    rows="3"
                                    value={settings.aboutP1}
                                    onChange={(e) => setSettings({...settings, aboutP1: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-xs outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-stone-600 mb-1">About Paragraph 2</label>
                                  <textarea
                                    rows="3"
                                    value={settings.aboutP2}
                                    onChange={(e) => setSettings({...settings, aboutP2: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-xs outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-stone-600 mb-1">About Paragraph 3</label>
                                  <textarea
                                    rows="3"
                                    value={settings.aboutP3}
                                    onChange={(e) => setSettings({...settings, aboutP3: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-xs outline-none"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold text-stone-600 mb-1">Physical Warehouse Address</label>
                                <input 
                                  type="text"
                                  value={settings.address}
                                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                                  className="w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-xs outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-stone-600 mb-1">Google Maps Embed Link</label>
                                <input 
                                  type="text"
                                  value={settings.googleMapsEmbed}
                                  onChange={(e) => setSettings({...settings, googleMapsEmbed: e.target.value})}
                                  className="w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-xs outline-none text-stone-400"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs font-bold text-stone-600 mb-1">Customer Support Email</label>
                                <input 
                                  type="email"
                                  value={settings.email}
                                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                                  className="w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-xs outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-stone-600 mb-1">Support Call line</label>
                                <input 
                                  type="text"
                                  value={settings.phone}
                                  onChange={(e) => setSettings({...settings, phone: e.target.value})}
                                  className="w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-xs outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-stone-600 mb-1">WhatsApp Chat Number</label>
                                <input 
                                  type="text"
                                  value={settings.whatsappNumber}
                                  onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
                                  className="w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-xs outline-none"
                                />
                              </div>
                            </div>

                          </div>

                          <div className="pt-4 border-t flex flex-wrap items-center gap-3">
                            <button
                              onClick={async () => {
                                if (backendOnline && settingsId) {
                                  try {
                                    const saved = await api.updateSettings(settingsId, settings);
                                    const { _id, ...rest } = saved;
                                    setSettings((prev) => ({ ...prev, ...rest }));
                                    triggerToast("Settings saved to database!");
                                    return;
                                  } catch (err) {
                                    triggerToast(`Save failed: ${err.message}`, "error");
                                    return;
                                  }
                                }
                                triggerToast("Settings saved to your browser storage.");
                              }}
                              className="px-6 py-2 bg-emerald-800 text-white font-bold rounded-lg text-xs uppercase"
                            >
                              Confirm Settings
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm("Reset homepage, about, and contact settings to defaults?")) {
                                  setSettings(defaultSettings);
                                  triggerToast("Settings reset to defaults.", "info");
                                }
                              }}
                              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-lg text-xs uppercase border border-stone-200"
                            >
                              Reset to Defaults
                            </button>
                            <span className="text-[10px] text-stone-400">Changes save automatically as you type.</span>
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB: EDITABLE TESTIMONIAL MANAGEMENT */}
                      {activeAdminTab === 'testimonials' && (
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200 space-y-6">
                          <h3 className="text-base font-bold text-stone-900">Manage Dynamic Customer Reviews</h3>
                          
                          <form onSubmit={handleAddTestimonial} className="bg-stone-50 p-4 border rounded-2xl space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-xs font-bold text-stone-600 mb-1">Author Name *</label>
                                <input 
                                  type="text" required
                                  value={newTestimonialName}
                                  onChange={(e) => setNewTestimonialName(e.target.value)}
                                  className="w-full px-3 py-1.5 bg-white border rounded text-xs outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-stone-600 mb-1">Role / Subtitle</label>
                                <input 
                                  type="text"
                                  value={newTestimonialRole}
                                  onChange={(e) => setNewTestimonialRole(e.target.value)}
                                  placeholder="Home Maker"
                                  className="w-full px-3 py-1.5 bg-white border rounded text-xs outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-stone-600 mb-1">Location</label>
                                <input 
                                  type="text"
                                  value={newTestimonialLocation}
                                  onChange={(e) => setNewTestimonialLocation(e.target.value)}
                                  placeholder="Gwalior"
                                  className="w-full px-3 py-1.5 bg-white border rounded text-xs outline-none"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-stone-600 mb-1">Star Count</label>
                              <select 
                                value={newTestimonialRating}
                                onChange={(e) => setNewTestimonialRating(e.target.value)}
                                className="px-3 py-1 bg-white border rounded text-xs"
                              >
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-stone-600 mb-1">Review Statement *</label>
                              <textarea 
                                required rows="2"
                                value={newTestimonialQuote}
                                onChange={(e) => setNewTestimonialQuote(e.target.value)}
                                className="w-full px-3 py-2 bg-white border rounded text-xs outline-none"
                              ></textarea>
                            </div>

                            <button type="submit" className="px-5 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold">
                              Publish Review
                            </button>
                          </form>

                          <div className="space-y-3">
                            <span className="text-[10px] text-stone-400 font-bold block">ACTIVE TESTIMONIAL REVIEWS:</span>
                            {testimonials.map(t => (
                              <div key={t.id} className="p-4 bg-stone-50 border rounded-xl flex items-center justify-between gap-4">
                                <div>
                                  <span className="text-xs font-bold text-stone-900 block">{t.name} ({t.location})</span>
                                  <span className="text-[10px] text-stone-500 italic">"{t.quote}"</span>
                                </div>
                                <button 
                                  onClick={() => deleteTestimonial(t.id)}
                                  className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB: DISTRIBUTOR LEADS CORES */}
                      {activeAdminTab === 'enquiries' && (
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200 space-y-6">
                          <div>
                            <h3 className="text-base font-bold text-stone-900">B2B Partner Submissions</h3>
                            <p className="text-xs text-stone-400">Review real-time submissions made on the contact or wholesale distributor forms.</p>
                          </div>

                          {enquiries.length === 0 ? (
                            <p className="text-center text-xs text-stone-400 py-10">No distributor enquiries logged in current server memory.</p>
                          ) : (
                            <div className="space-y-4">
                              {enquiries.map((e) => (
                                <div key={e.id} className="p-5 bg-stone-50 border border-stone-200 rounded-2xl relative space-y-3">
                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b pb-2">
                                    <div>
                                      <span className="text-[9px] font-extrabold text-amber-600 uppercase tracking-widest block">{e.type} Form Lead</span>
                                      <h4 className="text-sm font-bold text-stone-900">{e.name}</h4>
                                      <span className="text-xs text-stone-500">{e.business}</span>
                                    </div>
                                    <div className="text-right">
                                      <span className="block text-xs text-stone-400">{e.date}</span>
                                      <span className={`inline-block px-2.5 py-0.5 text-[9px] font-bold uppercase rounded-full ${e.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                                        {e.status}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                    <div className="flex items-center space-x-1.5">
                                      <Phone className="w-4 h-4 text-emerald-800" />
                                      <span><strong>Phone:</strong> {e.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                      <Mail className="w-4 h-4 text-emerald-800" />
                                      <span><strong>Email:</strong> {e.email}</span>
                                    </div>
                                  </div>

                                  <div className="bg-white p-3 rounded-lg text-xs text-stone-600 border">
                                    <span className="font-bold text-stone-800 block mb-1">Message Detail:</span>
                                    "{e.message || 'No specific text was provided.'}"
                                  </div>

                                  <div className="flex justify-end space-x-2 pt-2">
                                    <button 
                                      onClick={async () => {
                                        if (backendOnline) {
                                          try {
                                            await api.markEnquiryContacted(e.id);
                                          } catch (err) {
                                            triggerToast(`Update failed: ${err.message}`, "error");
                                            return;
                                          }
                                        }
                                        setEnquiries(enquiries.map(item => item.id === e.id ? { ...item, status: "Contacted" } : item));
                                        triggerToast(`Status synced for ${e.name}`);
                                      }}
                                      className="px-4 py-1.5 bg-emerald-800 text-white text-xs font-bold rounded-lg"
                                    >
                                      Mark Contacted
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                        </div>
                      )}

                      {/* SUB-TAB: SEO METATAG MANAGEMENT */}
                      {activeAdminTab === 'seo' && (
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200 space-y-6">
                          <h3 className="text-base font-bold text-stone-900">Manage Search Engine Optimization (SEO) & Metatags</h3>
                          <p className="text-xs text-stone-400">Ensure high-yield search results with rich schema and title tag customization.</p>

                          <div className="space-y-4 text-xs">
                            <div>
                              <label className="block text-xs font-bold text-stone-600 mb-1">Meta HTML Page Title Tag</label>
                              <input 
                                type="text"
                                value={settings.metaTitle}
                                onChange={(e) => setSettings({...settings, metaTitle: e.target.value})}
                                className="w-full px-4 py-2 bg-stone-50 border rounded-xl outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-stone-600 mb-1">Meta HTML Description Tag</label>
                              <textarea 
                                rows="3"
                                value={settings.metaDesc}
                                onChange={(e) => setSettings({...settings, metaDesc: e.target.value})}
                                className="w-full px-4 py-2 bg-stone-50 border rounded-xl outline-none"
                              ></textarea>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-stone-600 mb-1">Meta Keywords Tag (Comma Separated)</label>
                              <input 
                                type="text"
                                value={settings.metaKeywords}
                                onChange={(e) => setSettings({...settings, metaKeywords: e.target.value})}
                                className="w-full px-4 py-2 bg-stone-50 border rounded-xl outline-none"
                              />
                            </div>
                          </div>

                          <button 
                            onClick={() => triggerToast("Header Schema Tags modified!")}
                            className="px-5 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold uppercase"
                          >
                            Sync Metatags to Header Sockets
                          </button>
                        </div>
                      )}

                      {/* SUB-TAB: ANALYTICS — CATALOG + ENQUIRY METRICS FROM LIVE STATE */}
                      {activeAdminTab === 'analytics' && (
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200 space-y-6">
                          <h3 className="text-base font-bold text-stone-900">Live Catalog Analytics</h3>
                          <p className="text-xs text-stone-400">Computed in real-time from your products, categories and enquiries.</p>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                              <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-wider">Total Products</span>
                              <span className="text-2xl font-serif font-bold text-stone-900">{analytics.totalProducts}</span>
                              <span className="text-[9px] text-green-700 block mt-1">{analytics.visibleProducts} visible on site</span>
                            </div>

                            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                              <span className="text-[10px] text-amber-800 font-bold block uppercase tracking-wider">Categories</span>
                              <span className="text-2xl font-serif font-bold text-stone-900">{categories.length}</span>
                              <span className="text-[9px] text-amber-700 block mt-1">{analytics.featuredProducts} featured</span>
                            </div>

                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                              <span className="text-[10px] text-blue-800 font-bold block uppercase tracking-wider">Enquiries</span>
                              <span className="text-2xl font-serif font-bold text-stone-900">{enquiries.length}</span>
                              <span className="text-[9px] text-blue-700 block mt-1">{analytics.pendingEnquiries} pending follow-up</span>
                            </div>

                            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                              <span className="text-[10px] text-rose-800 font-bold block uppercase tracking-wider">Low Stock</span>
                              <span className="text-2xl font-serif font-bold text-stone-900">{analytics.lowStock.length}</span>
                              <span className="text-[9px] text-rose-700 block mt-1">SKUs below 50 units</span>
                            </div>
                          </div>

                          {/* Products by category */}
                          <div className="p-6 bg-stone-50 border rounded-2xl">
                            <span className="text-[11px] font-bold text-stone-500 uppercase block mb-4">Products by Category</span>
                            {Object.keys(analytics.productsByCategory).length === 0 ? (
                              <p className="text-xs text-stone-400 text-center py-6">No products to chart yet.</p>
                            ) : (
                              <div className="space-y-2">
                                {Object.entries(analytics.productsByCategory).map(([cat, count]) => {
                                  const max = Math.max(...Object.values(analytics.productsByCategory));
                                  const widthPct = (count / max) * 100;
                                  return (
                                    <div key={cat} className="flex items-center text-xs">
                                      <span className="w-40 shrink-0 font-semibold text-stone-700">{cat}</span>
                                      <div className="flex-grow bg-white border border-stone-200 rounded-full overflow-hidden h-5 relative">
                                        <div
                                          className="h-full bg-emerald-700 rounded-full"
                                          style={{ width: `${widthPct}%` }}
                                        ></div>
                                      </div>
                                      <span className="w-10 text-right font-bold text-stone-900">{count}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* Enquiries by status */}
                          <div className="p-6 bg-stone-50 border rounded-2xl">
                            <span className="text-[11px] font-bold text-stone-500 uppercase block mb-4">Enquiries by Status</span>
                            {Object.keys(analytics.enquiriesByStatus).length === 0 ? (
                              <p className="text-xs text-stone-400 text-center py-6">No enquiries yet.</p>
                            ) : (
                              <ul className="space-y-2">
                                {Object.entries(analytics.enquiriesByStatus).map(([status, count]) => (
                                  <li key={status} className="flex items-center justify-between text-xs bg-white p-3 rounded-lg border border-stone-100">
                                    <span className="font-semibold text-stone-700">{status}</span>
                                    <span className="font-bold text-emerald-800">{count}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      )}

                    </div>

                  </div>

                </div>
              )}

            </div>
          </div>
        )}

        {/* ==================== CART VIEW & RAZORPAY MOCKUP ==================== */}
        {currentPage === 'cart' && (
          <div className="animate-fadeIn py-12 bg-stone-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center mb-10">
                <h1 className="text-3xl font-serif font-bold text-stone-900">Review Shopping Bag</h1>
                <p className="text-xs text-stone-500 mt-1">Pre-built ecommerce integration with automated tax computations.</p>
              </div>

              {cart.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border shadow-sm max-w-md mx-auto">
                  <span className="inline-block p-4 bg-emerald-50 rounded-full text-emerald-800 mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </span>
                  <h3 className="text-base font-bold text-stone-900">Cart is Empty</h3>
                  <p className="text-xs text-stone-500 mt-2">Explore the premium staple catalog to begin your order.</p>
                  <button 
                    onClick={() => setCurrentPage('products')}
                    className="mt-6 px-6 py-2.5 bg-emerald-800 text-white rounded-xl text-xs uppercase font-bold"
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.chosenWeight}`} className="bg-white p-4 rounded-2xl border flex items-center justify-between gap-4 shadow-sm">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border bg-stone-50" />
                        
                        <div className="flex-grow min-w-0">
                          <h4 className="font-bold text-stone-900 text-xs truncate">{item.name}</h4>
                          <span className="text-[10px] text-amber-600 font-extrabold uppercase">{item.chosenWeight} Pack</span>
                          <p className="text-xs text-emerald-800 font-bold mt-1">₹{item.price} each</p>
                        </div>

                        <div className="flex items-center space-x-2 bg-stone-100 px-3 py-1.5 rounded-xl border">
                          <button onClick={() => updateCartQuantity(item.id, item.chosenWeight, -1)} className="text-stone-500 hover:text-stone-900 font-bold px-1">-</button>
                          <span className="text-xs font-bold px-1">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.id, item.chosenWeight, 1)} className="text-stone-500 hover:text-stone-900 font-bold px-1">+</button>
                        </div>

                        <button onClick={() => removeFromCart(item.id, item.chosenWeight)} className="p-2 text-stone-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-3xl p-6 border h-fit space-y-6">
                    <h3 className="font-serif font-bold text-base text-stone-900 border-b pb-3">Bill Settlement</h3>
                    
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between text-stone-600">
                        <span>Items Subtotal</span>
                        <span>₹{cartTotal}</span>
                      </div>
                      <div className="flex justify-between text-stone-600">
                        <span>GST / Staples Tax (5%)</span>
                        <span>₹{Math.round(cartTotal * 0.05)}</span>
                      </div>
                      <div className="flex justify-between text-stone-900 font-bold pt-3 border-t">
                        <span>Grand Settlement</span>
                        <span className="text-emerald-800 text-sm">₹{cartTotal + Math.round(cartTotal * 0.05)}</span>
                      </div>
                    </div>

                    <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                      <button 
                        type="submit"
                        className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs uppercase shadow tracking-wider"
                      >
                        Launch Mock Razorpay Payment Gateway
                      </button>
                    </form>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

        {/* ==================== REAL-TIME ORDER TRACKING SYSTEM ==================== */}
        {currentPage === 'tracking' && (
          <div className="animate-fadeIn py-12 bg-stone-50">
            <div className="max-w-xl mx-auto px-4 sm:px-6">
              
              <div className="bg-white rounded-3xl p-8 shadow-md border text-center space-y-6">
                
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 mx-auto border-2 border-emerald-300 animate-pulse">
                  <Check className="w-8 h-8" />
                </div>

                <div>
                  <h1 className="text-2xl font-serif font-bold text-stone-900">Authorization Invoice Successful!</h1>
                  <p className="text-xs text-stone-400 mt-1">Your premium staple order is cleared. Below is the automated shipping tracker.</p>
                </div>

                {orders.length > 0 && (
                  <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50 text-left space-y-4">
                    <div className="flex justify-between items-center border-b pb-3">
                      <div>
                        <span className="text-[9px] text-stone-400 uppercase tracking-widest font-extrabold">Shipment Tracking SKU ID</span>
                        <p className="text-sm font-bold font-mono text-emerald-800">{orders[0].orderId}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-stone-400 uppercase tracking-widest font-extrabold block">Authorized On</span>
                        <span className="text-xs font-bold text-stone-700">{orders[0].date}</span>
                      </div>
                    </div>

                    <div className="space-y-6 pt-2">
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-800 border-4 border-emerald-200 shrink-0 mt-0.5"></div>
                        <div>
                          <p className="text-xs font-bold text-emerald-900">Order Approved & Verified</p>
                          <p className="text-[10px] text-stone-500">Inventory warehouse acknowledged your packaging sizes.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-amber-500 border-4 border-amber-200 shrink-0 mt-0.5 animate-pulse"></div>
                        <div>
                          <p className="text-xs font-bold text-stone-800">Aspiration Check & Sealing Run</p>
                          <p className="text-[10px] text-stone-500">Continuous sealing running active. Preparing transit dispatch parameters.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button 
                  onClick={() => setCurrentPage('home')}
                  className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Return to Home
                </button>

              </div>
            </div>
          </div>
        )}

      </main>

      {/* ==================== QUICK-VIEW DETAILED MODAL ==================== */}
      {selectedProductDetails && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl border max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setSelectedProductDetails(null)}
              className="absolute top-4 right-4 p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-3">
                {(() => {
                  const gallery = (selectedProductDetails.images && selectedProductDetails.images.length)
                    ? selectedProductDetails.images
                    : (selectedProductDetails.image ? [selectedProductDetails.image] : []);
                  const activeIdx = Math.min(quickViewImageIndex, gallery.length - 1);
                  return (
                    <>
                      <div className="rounded-2xl overflow-hidden border border-stone-200 bg-white h-52 md:h-72">
                        <img 
                          src={gallery[activeIdx] || selectedProductDetails.image} 
                          alt={selectedProductDetails.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {gallery.length > 1 && (
                        <div className="flex flex-wrap gap-2">
                          {gallery.map((img, idx) => (
                            <button
                              key={`${idx}-${img.slice(0, 24)}`}
                              type="button"
                              onClick={() => setQuickViewImageIndex(idx)}
                              className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${idx === activeIdx ? 'border-emerald-700 ring-2 ring-emerald-200' : 'border-stone-200 hover:border-stone-300'}`}
                            >
                              <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

              <div className="space-y-4">
                <span className="inline-block bg-amber-100 text-amber-800 font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">
                  {selectedProductDetails.tag || selectedProductDetails.category}
                </span>

                <h3 className="text-xl font-serif font-bold text-stone-900">
                  {selectedProductDetails.name}
                </h3>

                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  {selectedProductDetails.description}
                </p>

                <div className="pt-4 border-t text-xs">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Standard Packaging Details:</span>
                  <p className="text-stone-700 font-semibold">Moisture Sealed Multi-layered Pack - {selectedProductDetails.weight}</p>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => {
                      setContactType('Inquiry');
                      setContactMessage(`Enquiring about bulk delivery and details for ${selectedProductDetails.name}.`);
                      setSelectedProductDetails(null);
                      setCurrentPage('contact');
                    }}
                    className="w-full bg-emerald-800 hover:bg-emerald-950 text-white font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider"
                  >
                    Enquire Now
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* ==================== INTERACTIVE BRAND PRESET CUSTOMIZER PANEL ==================== */}
      {isCustomizerOpen && (
        <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl z-50 p-6 border-l overflow-y-auto animate-fadeIn flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">Set Brand Presets</h3>
                <p className="text-[10px] text-stone-400">Collaboratively customize the storefront layout live.</p>
              </div>
              <button 
                onClick={() => setIsCustomizerOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6 pt-6">
              
              {/* Question 1 */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">1. Language Preferences</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => { setLanguagePref('english'); triggerToast("Language set to English."); }}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${languagePref === 'english' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-stone-50 hover:bg-stone-100'}`}
                  >
                    English Only
                  </button>
                  <button 
                    onClick={() => { setLanguagePref('bilingual'); triggerToast("Bilingual Hindi-English enabled."); }}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${languagePref === 'bilingual' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-stone-50 hover:bg-stone-100'}`}
                  >
                    Hindi-English
                  </button>
                </div>
              </div>

              {/* Question 2 */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">2. Branding Color Presets</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => { setColorTheme('forest-gold'); triggerToast("Active Scheme: Forest Green & Golden."); }}
                    className={`p-3 rounded-xl border text-center transition-all ${colorTheme === 'forest-gold' ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-bold' : 'bg-stone-50'}`}
                  >
                    <div className="flex justify-center space-x-1 mb-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-800"></span>
                      <span className="w-3.5 h-3.5 rounded-full bg-amber-500"></span>
                    </div>
                    <span className="text-[10px]">Forest & Golden</span>
                  </button>
                  
                  <button 
                    onClick={() => { setColorTheme('vintage-brown'); triggerToast("Active Scheme: Earth Brown & Amber."); }}
                    className={`p-3 rounded-xl border text-center transition-all ${colorTheme === 'vintage-brown' ? 'border-amber-700 bg-amber-50 text-amber-950 font-bold' : 'bg-stone-50'}`}
                  >
                    <div className="flex justify-center space-x-1 mb-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-amber-900"></span>
                      <span className="w-3.5 h-3.5 rounded-full bg-stone-300"></span>
                    </div>
                    <span className="text-[10px]">Earth & Amber</span>
                  </button>
                </div>
              </div>

              {/* Question 3 */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">3. Brand Information</label>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="block text-[10px] text-stone-500 mb-1">Brand Name:</span>
                    <input 
                      type="text"
                      value={settings.brandName}
                      onChange={(e) => setSettings({...settings, brandName: e.target.value})}
                      className="w-full px-3 py-1.5 bg-stone-50 border rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-500 mb-1">Active Tagline:</span>
                    <input 
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => setSettings({...settings, tagline: e.target.value})}
                      className="w-full px-3 py-1.5 bg-stone-50 border rounded-lg outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Information */}
              <div className="p-4 bg-amber-50 text-amber-950 rounded-xl border text-xs">
                <p className="font-bold flex items-center space-x-1">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Real-time Dynamic Syncing</span>
                </p>
                <p className="mt-1 leading-relaxed text-[10px] text-stone-600">
                  Changing titles or active themes in this assist pane adapts the storefront instantly. Go to the Admin tab to configure advanced parameters!
                </p>
              </div>

            </div>
          </div>

          <button 
            onClick={() => setIsCustomizerOpen(false)}
            className="w-full py-3 bg-emerald-800 text-white font-bold rounded-xl text-xs uppercase mt-6"
          >
            Apply Configurations
          </button>
        </div>
      )}

      {/* ==================== PREMIUM BRAND FOOTER ==================== */}
      <footer className="bg-emerald-950 text-stone-300 pt-16 pb-8 border-t border-emerald-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-emerald-900/50">
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-amber-400">
                  <span className="text-emerald-900 font-serif text-xl font-black">I</span>
                </div>
                <div>
                  <span className="text-xl font-serif font-bold text-white block">{settings.brandName}</span>
                  <span className="text-[9px] tracking-widest font-extrabold text-amber-400 uppercase">Pure Quality</span>
                </div>
              </div>
              <p className="text-xs text-emerald-100/70 leading-relaxed font-light">
                Premium grade hygiene, direct-to-farm transparent sugar cane processing, and high nutrient-value flattened rice. Sourced from organic hubs.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Store Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-amber-400 transition-colors">Home landing</button></li>
                <li><button onClick={() => setCurrentPage('about')} className="hover:text-amber-400 transition-colors">About Sourcing</button></li>
                <li><button onClick={() => setCurrentPage('products')} className="hover:text-amber-400 transition-colors">Product Store</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-amber-400 transition-colors">Apply Distributorship</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Staples Sourcing</h4>
              <ul className="space-y-2 text-xs">
                <li><span className="cursor-pointer hover:text-amber-400" onClick={() => { setSelectedCategory('Sugar'); setCurrentPage('products'); }}>Sulphur Free Sugar</span></li>
                <li><span className="cursor-pointer hover:text-amber-400" onClick={() => { setSelectedCategory('Sugar'); setCurrentPage('products'); }}>Natural Unrefined Brown Sugar</span></li>
                <li><span className="cursor-pointer hover:text-amber-400" onClick={() => { setSelectedCategory('Poha'); setCurrentPage('products'); }}>Premium Thin Diet Poha</span></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Contact Office</h4>
              <p className="text-xs leading-normal font-light flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </p>
              <p className="text-xs leading-normal font-light flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-amber-400">{settings.phone}</a>
              </p>
              <p className="text-xs leading-normal font-light flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-amber-400 break-all">{settings.email}</a>
              </p>
              <div className="flex space-x-3 pt-2">
                <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="text-emerald-100 hover:text-amber-400">Facebook</a>
                <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="text-emerald-100 hover:text-amber-400">Instagram</a>
                <a href={settings.linkedinUrl} target="_blank" rel="noreferrer" className="text-emerald-100 hover:text-amber-400">LinkedIn</a>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-emerald-100/60 gap-4">
            <p>© 2026 Impal Food Products. All Rights Reserved. Purity. Trust. Quality.</p>
          </div>

        </div>
      </footer>

      {/* FLOATING WHATSAPP CHAT INSTANT BUTTON */}
      <a 
        href={`https://wa.me/${settings.whatsappNumber}?text=Hi Impal Food, interested in purchasing premium staples.`}
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center border-2 border-white animate-bounce"
        title="Chat on WhatsApp"
      >
        <Smartphone className="w-7 h-7" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-amber-400 rounded-full border border-white"></span>
      </a>

    </div>
  );
}