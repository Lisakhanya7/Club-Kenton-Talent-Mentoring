// ===========================
// LOCAL STORAGE UTILITIES
// ===========================

/**
 * Storage Manager - Handle all localStorage operations
 */
const StorageManager = {
    /**
     * Load all data from localStorage
     * @returns {Object} All stored data
     */
    loadAll() {
        return {
            fixtures: this.load('fixtures'),
            results: this.load('results'),
            players: this.load('players'),
            news: this.load('news'),
            media: this.load('media')
        };
    },

    /**
     * Load specific data type
     * @param {string} type - Data type key
     * @returns {Array} Data array
     */
    load(type) {
        return JSON.parse(localStorage.getItem(type)) || [];
    },

    /**
     * Save data to localStorage
     * @param {string} type - Data type key
     * @param {Array} data - Data to save
     */
    save(type, data) {
        localStorage.setItem(type, JSON.stringify(data));
    },

    /**
     * Get next ID for a data type
     * @param {string} type - Data type key
     * @returns {number} Next available ID
     */
    getNextId(type) {
        const data = this.load(type);
        return data.length > 0 ? Math.max(...data.map(item => item.id || 0)) + 1 : 1;
    },

    /**
     * Add item to a data type
     * @param {string} type - Data type key
     * @param {Object} item - Item to add
     */
    addItem(type, item) {
        const data = this.load(type);
        item.id = this.getNextId(type);
        data.push(item);
        this.save(type, data);
    },

    /**
     * Remove item from a data type
     * @param {string} type - Data type key
     * @param {number} id - Item ID to remove
     */
    removeItem(type, id) {
        const data = this.load(type).filter(item => item.id !== id);
        this.save(type, data);
    },

    /**
     * Update item in a data type
     * @param {string} type - Data type key
     * @param {number} id - Item ID to update
     * @param {Object} updates - Fields to update
     */
    updateItem(type, id, updates) {
        const data = this.load(type).map(item => 
            item.id === id ? { ...item, ...updates } : item
        );
        this.save(type, data);
    },

    /**
     * Clear all data
     */
    clearAll() {
        localStorage.clear();
    }
};
