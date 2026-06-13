// API client for the IMPAL Food Django REST backend.
// All calls degrade gracefully: callers can catch errors and fall back to local state.

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api").replace(/\/$/, "");
const TOKEN_KEY = "impal:jwt";

export function getToken() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  if (typeof window === "undefined") return;
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let detail = `${res.status}`;
    try {
      const data = await res.json();
      detail = data.detail || JSON.stringify(data);
    } catch {
      // ignore
    }
    const err = new Error(detail);
    err.status = res.status;
    throw err;
  }
  if (res.status === 204) return null;
  return res.json();
}

// DRF pagination returns { results: [...] }; bare lists come back as arrays.
function unwrap(data) {
  if (data && Array.isArray(data.results)) return data.results;
  return Array.isArray(data) ? data : [];
}

// ---------- Field mappers (snake_case API <-> camelCase frontend) ----------

export function productFromApi(p) {
  return {
    id: p.id,
    name: p.name,
    category: p.category_name || p.category,
    categoryId: p.category,
    weight: p.weight,
    weights: p.weights || [],
    description: p.description || "",
    ingredients: p.ingredients || "",
    price: Number(p.price),
    oldPrice: p.old_price != null ? Number(p.old_price) : null,
    stock: p.stock,
    rating: Number(p.rating),
    reviews: p.reviews,
    image: p.image,
    images: Array.isArray(p.images) && p.images.length ? p.images : (p.image ? [p.image] : []),
    isFeatured: p.is_featured,
    isVisible: p.is_visible,
    tag: p.tag || "",
  };
}

export function productToApi(p, categoryId) {
  return {
    name: p.name,
    category: categoryId,
    weight: p.weight,
    weights: p.weights || [],
    description: p.description || "",
    ingredients: p.ingredients || "",
    price: p.price,
    old_price: p.oldPrice || null,
    stock: p.stock,
    image: (Array.isArray(p.images) && p.images[0]) || p.image || "",
    images: Array.isArray(p.images) ? p.images : (p.image ? [p.image] : []),
    is_featured: !!p.isFeatured,
    is_visible: p.isVisible !== false,
    tag: p.tag || "",
  };
}

export function galleryFromApi(g) {
  return {
    id: g.id,
    title: g.title,
    description: g.description || "",
    image: g.image,
    category: g.category,
  };
}

export function galleryToApi(g) {
  return {
    title: g.title,
    description: g.description || "",
    image: g.image,
    category: g.category || "Factory",
  };
}

export function testimonialFromApi(t) {
  return {
    id: t.id,
    name: t.name,
    role: t.role || "",
    location: t.location || "",
    rating: t.rating,
    quote: t.quote,
  };
}

export function testimonialToApi(t) {
  return {
    name: t.name,
    role: t.role || "Verified Buyer",
    location: t.location || "India",
    rating: t.rating,
    quote: t.quote,
  };
}

export function orderFromApi(o) {
  return {
    orderId: o.order_id,
    items: (o.items || []).map((it) => ({
      id: it.product,
      name: it.product_name,
      chosenWeight: it.chosen_weight,
      quantity: it.quantity,
      price: Number(it.unit_price),
    })),
    total: Number(o.subtotal),
    status: o.status,
    date: o.created_at ? new Date(o.created_at).toLocaleDateString() : "",
    timeline: o.timeline || [],
  };
}

export function settingsFromApi(s) {
  return {
    brandName: s.brand_name,
    tagline: s.tagline,
    heroDescription: s.hero_description,
    aboutHeading: s.about_heading,
    aboutP1: s.about_p1,
    aboutP2: s.about_p2,
    aboutP3: s.about_p3,
    heroImage: s.hero_image,
    whatsappNumber: s.whatsapp_number,
    address: s.address,
    email: s.email,
    phone: s.phone,
    facebookUrl: s.facebook_url,
    instagramUrl: s.instagram_url,
    linkedinUrl: s.linkedin_url,
    metaTitle: s.meta_title,
    metaDesc: s.meta_desc,
    metaKeywords: s.meta_keywords,
    ecommerceActive: s.ecommerce_active,
    displayPublicPrices: s.display_public_prices,
    googleMapsEmbed: s.google_maps_embed,
    _id: s.id,
  };
}

export function settingsToApi(s) {
  return {
    brand_name: s.brandName,
    tagline: s.tagline,
    hero_description: s.heroDescription,
    about_heading: s.aboutHeading,
    about_p1: s.aboutP1,
    about_p2: s.aboutP2,
    about_p3: s.aboutP3,
    hero_image: s.heroImage,
    whatsapp_number: s.whatsappNumber,
    address: s.address,
    email: s.email,
    phone: s.phone,
    facebook_url: s.facebookUrl,
    instagram_url: s.instagramUrl,
    linkedin_url: s.linkedinUrl,
    meta_title: s.metaTitle,
    meta_desc: s.metaDesc,
    meta_keywords: s.metaKeywords,
    ecommerce_active: !!s.ecommerceActive,
    display_public_prices: !!s.displayPublicPrices,
    google_maps_embed: s.googleMapsEmbed,
  };
}

// ---------- High level API ----------

export const api = {
  base: API_BASE,

  // Uploads an image file to Cloudinary via the backend and returns its URL.
  async uploadImage(file) {
    const form = new FormData();
    form.append("file", file);
    const headers = {};
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}/upload/`, {
      method: "POST",
      headers,
      body: form,
    });
    if (!res.ok) {
      let detail = `${res.status}`;
      try {
        const data = await res.json();
        detail = data.detail || JSON.stringify(data);
      } catch {
        // ignore
      }
      throw new Error(detail);
    }
    const data = await res.json();
    return data.url;
  },

  async login(username, password) {
    const data = await request("/auth/token/", {
      method: "POST",
      body: { username, password },
    });
    setToken(data.access);
    return data;
  },

  logout() {
    setToken(null);
  },

  // Reads
  async getCategories() {
    return unwrap(await request("/categories/")).map((c) => ({ id: c.id, name: c.name }));
  },
  async getProducts() {
    return unwrap(await request("/products/")).map(productFromApi);
  },
  async getGallery() {
    return unwrap(await request("/gallery/")).map(galleryFromApi);
  },
  async getTestimonials() {
    return unwrap(await request("/testimonials/")).map(testimonialFromApi);
  },
  async getSettings() {
    const data = await request("/settings/current/");
    return data ? settingsFromApi(data) : null;
  },
  async getOrders() {
    return unwrap(await request("/orders/", { auth: true })).map(orderFromApi);
  },
  async getEnquiries() {
    return unwrap(await request("/enquiries/", { auth: true }));
  },

  // Public writes
  async createEnquiry(payload) {
    return request("/enquiries/", { method: "POST", body: payload });
  },
  async createOrder(payload) {
    return orderFromApi(await request("/orders/", { method: "POST", body: payload }));
  },

  // Admin writes
  async createProduct(product, categoryId) {
    return productFromApi(
      await request("/products/", { method: "POST", body: productToApi(product, categoryId), auth: true })
    );
  },
  async updateProduct(id, product, categoryId) {
    return productFromApi(
      await request(`/products/${id}/`, { method: "PATCH", body: productToApi(product, categoryId), auth: true })
    );
  },
  async deleteProduct(id) {
    return request(`/products/${id}/`, { method: "DELETE", auth: true });
  },
  async createCategory(name) {
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    return request("/categories/", { method: "POST", body: { name, slug }, auth: true });
  },
  async deleteCategory(id) {
    return request(`/categories/${id}/`, { method: "DELETE", auth: true });
  },
  async createGallery(item) {
    return galleryFromApi(
      await request("/gallery/", { method: "POST", body: galleryToApi(item), auth: true })
    );
  },
  async deleteGallery(id) {
    return request(`/gallery/${id}/`, { method: "DELETE", auth: true });
  },
  async createTestimonial(item) {
    return testimonialFromApi(
      await request("/testimonials/", { method: "POST", body: testimonialToApi(item), auth: true })
    );
  },
  async deleteTestimonial(id) {
    return request(`/testimonials/${id}/`, { method: "DELETE", auth: true });
  },
  async updateOrderStatus(orderId, status) {
    // orderId here is the human order_id; backend action uses pk, so we look it up.
    const orders = unwrap(await request("/orders/", { auth: true }));
    const match = orders.find((o) => o.order_id === orderId);
    if (!match) throw new Error("Order not found");
    return orderFromApi(
      await request(`/orders/${match.id}/update_status/`, { method: "POST", body: { status }, auth: true })
    );
  },
  async markEnquiryContacted(id) {
    return request(`/enquiries/${id}/mark_contacted/`, { method: "POST", auth: true });
  },
  async updateSettings(id, settings) {
    return settingsFromApi(
      await request(`/settings/${id}/`, { method: "PATCH", body: settingsToApi(settings), auth: true })
    );
  },
};
