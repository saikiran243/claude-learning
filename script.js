/**
 * JAGGER - Premium Men's Custom Tailoring
 * Main JavaScript Module
 */

// ========================================
// DATA: Style Collection
// ========================================
const stylesData = [
    // SUITS & BLAZERS
    {
        id: 'suit-navy-two-button',
        category: 'suits',
        name: 'Navy Two-Button Suit',
        description: 'The cornerstone of every gentleman\'s wardrobe. Cut from Italian Super 130\'s wool with a natural shoulder, notch lapel, and clean silhouette that transitions seamlessly from boardroom to evening.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%231a1a1a" width="400" height="533"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="20" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3ENAVY SUIT%3C/text%3E%3C/svg%3E',
        features: ['Super 130\'s Italian Wool', 'Natural Shoulder', 'Notch Lapel', 'Functioning Buttonholes', 'Half Canvas Construction'],
        customizations: {
            fabric: ['Navy Super 130\'s', 'Navy Super 150\'s', 'Midnight Blue Flannel', 'Navy Hopsack', 'Navy Fresco'],
            lapel: ['Notch (Classic)', 'Peak (Formal)', 'Notch with Peak Accent'],
            buttons: ['2-Button (Standard)', '3-Button (Traditional)', '1-Button (Modern)'],
            vents: ['Double Vent (Classic)', 'Single Vent (Traditional)', 'No Vent (Clean)'],
            lining: ['Bemberg Navy', 'Bemberg Burgundy', 'Custom Monogram', 'Silk Paisley'],
            pockets: ['Flap Pockets', 'Jetted Pockets', 'Patch Pockets (Casual)']
        }
    },
    {
        id: 'suit-charcoal-three-piece',
        category: 'suits',
        name: 'Charcoal Three-Piece Suit',
        description: 'Timeless elegance with a matching waistcoat. Perfect for weddings, formal events, and distinguished business settings. The waistcoat adds versatility - wear the full ensemble or just the suit.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%232d2d2d" width="400" height="533"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="20" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3ECHARCOAL 3-PIECE%3C/text%3E%3C/svg%3E',
        features: ['Super 120\'s Wool', 'Matching Waistcoat', 'Notch Lapel', '5-Button Waistcoat', 'Full Canvas Option'],
        customizations: {
            fabric: ['Charcoal Super 120\'s', 'Charcoal Birdseye', 'Charcoal Herringbone', 'Dark Grey Flannel'],
            lapel: ['Notch (Classic)', 'Peak (Formal)', 'Wide Peak (Statement)'],
            waistcoat: ['5-Button (Classic)', '6-Button (Tall)', 'Notch Lapel Waistcoat'],
            buttons: ['Horn (Standard)', 'Mother of Pearl', 'Metal (Brass/Silver)'],
            lining: ['Bemberg Grey', 'Bemberg Navy', 'Custom Monogram']
        }
    },
    {
        id: 'blazer-navy-hopsack',
        category: 'suits',
        name: 'Navy Hopsack Blazer',
        description: 'The ultimate versatile jacket. Hopsack\'s open weave breathes beautifully in warm weather while maintaining structure. Gold buttons elevate it for yacht club elegance; horn buttons keep it office-appropriate.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%231a3a4a" width="400" height="533"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="20" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3ENAVY BLAZER%3C/text%3E%3C/svg%3E',
        features: ['Hopsack Weave', 'Unstructured Option', 'Patch Pockets', 'Gold or Horn Buttons', 'Half Lined'],
        customizations: {
            fabric: ['Navy Hopsack', 'Navy Fresco', 'Light Blue Hopsack', 'Cream Hopsack'],
            structure: ['Unstructured (Soft)', 'Light Structure', 'Full Structure'],
            buttons: ['Gold Metal', 'Silver Metal', 'Horn', 'Mother of Pearl'],
            pockets: ['Patch Pockets', 'Patch + Flap', 'Jetted Pockets'],
            lining: ['Half Lined (Standard)', 'Quarter Lined (Summer)', 'Full Lined (Winter)']
        }
    },
    {
        id: 'suit-tuxedo-midnight',
        category: 'suits',
        name: 'Midnight Blue Tuxedo',
        description: 'Modern black-tie essential. Midnight blue reads deeper than black under artificial light. Satin peak lapels, covered buttons, and a clean silhouette make this the definitive evening investment.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%230a0a1a" width="400" height="533"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="20" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3EMIDNIGHT TUXEDO%3C/text%3E%3C/svg%3E',
        features: ['Midnight Blue Wool', 'Satin Peak Lapels', 'Covered Buttons', 'Jetted Pockets', 'Satin Stripe Trousers'],
        customizations: {
            fabric: ['Midnight Blue Super 130\'s', 'Black Super 130\'s', 'Midnight Blue Velvet (Seasonal)'],
            lapel: ['Peak Lapel (Classic)', 'Shawl Collar (Elegant)', 'Notch Lapel (Modern)'],
            buttons: ['Covered (Standard)', 'Satin Covered', 'Mother of Pearl'],
            trousers: ['Satin Stripe (Classic)', 'Braid Trim', 'No Stripe (Modern)'],
            waist: ['Waistcoat (Low Cut)', 'Cummerbund', 'Side Adjusters Only']
        }
    },
    {
        id: 'suit-brown-check',
        category: 'suits',
        name: 'Brown Windowpane Check Suit',
        description: 'Distinguished character for the confident gentleman. Subtle windowpane over a rich brown base adds visual interest without sacrificing versatility. Ideal for autumn/winter wardrobes and creative professions.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%234a3728" width="400" height="533"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="20" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3EBROWN CHECK%3C/text%3E%3C/svg%3E',
        features: ['Brown Windowpane Wool', 'Notch Lapel', 'Patch Pockets Optional', 'Horn Buttons', 'Half Canvas'],
        customizations: {
            fabric: ['Brown Windowpane', 'Taupe Windowpane', 'Olive Windowpane', 'Grey Windowpane'],
            checkScale: ['Fine (Subtle)', 'Medium (Classic)', 'Bold (Statement)'],
            pockets: ['Flap (Standard)', 'Patch (Casual)', 'Jetted (Formal)'],
            buttons: ['Dark Horn', 'Light Horn', 'Leather', 'Metal'],
            lining: ['Bemberg Rust', 'Bemberg Olive', 'Custom Paisley']
        }
    },

    // SHIRTS
    {
        id: 'shirt-white-poplin',
        category: 'shirts',
        name: 'White Poplin Dress Shirt',
        description: 'The ultimate foundation shirt. Italian Albini poplin - crisp, cool, and lustrous. Cut with a clean spread collar, single-needle stitching throughout, and mother-of-pearl buttons. Essential for every formal occasion.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%23ffffff" width="400" height="533"/%3E%3Crect fill="%23e0e0e0" x="180" y="50" width="40" height="433"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="18" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3EWHITE POPLIN%3C/text%3E%3C/svg%3E',
        features: ['Albini Italian Poplin', 'Spread Collar', 'Mother-of-Pearl Buttons', 'Single-Needle Stitching', 'French Cuff Option'],
        customizations: {
            collar: ['Spread (Classic)', 'Wide Spread', 'Button-Down', 'Cutaway', 'Club Collar'],
            cuff: ['Single Button', 'Double Button', 'French Cuff', 'Convertible Cuff'],
            fit: ['Classic', 'Slim', 'Contemporary', 'Athletic'],
            placket: ['Standard', 'French Placket', 'Fly Front', 'Covered Placket'],
            pocket: ['No Pocket (Formal)', 'Left Chest Pocket', 'Two Pockets (Casual)'],
            monogram: ['None', 'Cuff (Standard)', 'Pocket', 'Custom Placement']
        }
    },
    {
        id: 'shirt-blue-oxford',
        category: 'shirts',
        name: 'Blue Oxford Cloth Shirt',
        description: 'Smart-casual cornerstone. Heavier Oxford cloth drapes beautifully and ages gracefully. Button-down collar rolls perfectly. The shirt that works with everything - denim, chinos, or under a blazer.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%233a5ba0" width="400" height="533"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="18" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3EBLUE OXFORD%3C/text%3E%3C/svg%3E',
        features: ['Premium Oxford Cloth', 'Button-Down Collar', 'Single-Needle Stitching', 'Mother-of-Pearl Buttons', 'Rounded Hem'],
        customizations: {
            color: ['Classic Blue', 'Light Blue', 'White', 'Pink', 'Lavender', 'University Stripe'],
            collar: ['Button-Down (Classic)', 'Spread', 'Wide Spread', 'Hidden Button-Down'],
            fit: ['Classic', 'Slim', 'Contemporary'],
            pocket: ['Left Chest (Standard)', 'No Pocket', 'Two Pockets'],
            cuff: ['Single Button', 'Double Button']
        }
    },
    {
        id: 'shirt-white-twill',
        category: 'shirts',
        name: 'White Twill Formal Shirt',
        description: 'Subtle diagonal weave adds texture and sheen. Slightly heavier than poplin, perfect for cooler months and formal occasions. The twill\'s natural wrinkle resistance keeps you sharp through long events.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%23fafafa" width="400" height="533"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="18" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3EWHITE TWILL%3C/text%3E%3C/svg%3E',
        features: ['Italian Twill Weave', 'Cutaway Collar', 'French Cuffs Standard', 'Wrinkle Resistant', 'Lustrous Finish'],
        customizations: {
            collar: ['Cutaway (Formal)', 'Spread', 'Wide Spread', 'Wingtip (Black Tie)'],
            cuff: ['French Cuff (Standard)', 'Convertible', 'Single Button'],
            fit: ['Classic', 'Slim', 'Contemporary'],
            placket: ['French Placket', 'Fly Front', 'Covered'],
            pocket: ['No Pocket', 'Left Chest']
        }
    },
    {
        id: 'shirt-stripe-bengal',
        category: 'shirts',
        name: 'Bengal Stripe Shirt',
        description: 'Classic blue-and-white bengal stripe - the businessman\'s armor. Fine yarn, tight weave for a dress-shirt hand. Versatile enough for the office with a navy suit, or rolled sleeves with chinos.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%23ffffff" width="400" height="533"/%3E%3Crect fill="%233a5ba0" x="50" y="0" width="30" height="533"/%3E%3Crect fill="%233a5ba0" x="130" y="0" width="30" height="533"/%3E%3Crect fill="%233a5ba0" x="210" y="0" width="30" height="533"/%3E%3Crect fill="%233a5ba0" x="290" y="0" width="30" height="533"/%3E%3Crect fill="%233a5ba0" x="370" y="0" width="30" height="533"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="18" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3EBENGAL STRIPE%3C/text%3E%3C/svg%3E',
        features: ['Bengal Stripe Poplin', 'Spread Collar', 'Perfect Pattern Match', 'Mother-of-Pearl Buttons', 'Single-Needle Construction'],
        customizations: {
            stripe: ['Blue/White (Classic)', 'Pink/White', 'Lavender/White', 'Grey/White', 'Multi-Stripe'],
            stripeWidth: ['Fine (2mm)', 'Classic (4mm)', 'Bold (6mm)'],
            collar: ['Spread', 'Wide Spread', 'Button-Down', 'Cutaway'],
            cuff: ['Single Button', 'Double Button', 'French Cuff'],
            fit: ['Classic', 'Slim', 'Contemporary']
        }
    },

    // TRADITIONAL
    {
        id: 'traditional-sherwani',
        category: 'traditional',
        name: 'Classic Sherwani',
        description: 'Regal elegance for the groom. Hand-embroidered with traditional motifs on premium silk or brocade. Structured silhouette with mandarin collar, tailored to perfection for your special day.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%238b0000" width="400" height="533"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="20" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3ESHERWANI%3C/text%3E%3C/svg%3E',
        features: ['Premium Silk/Brocade', 'Hand Embroidery', 'Mandarin Collar', 'Structured Fit', 'Matching Churidar'],
        customizations: {
            fabric: ['Raw Silk', 'Banarasi Brocade', 'Velvet (Winter)', 'Jamawwinter)', 'Tussar Silk'],
            color: ['Ivory/Gold', 'Maroon/Gold', 'Navy/Gold', 'Emerald/Gold', 'Black/Gold', 'Custom'],
            embroidery: ['Zardozi (Heavy)', 'Resham (Thread)', 'Mixed Media', 'Minimal (Modern)'],
            collar: ['Mandarin (Classic)', 'Band Collar', 'Notch Lapel (Indo-Western)'],
            buttons: ['Covered Silk', 'Metal (Gold/Silver)', 'Kundan', 'Pearl'],
            bottom: ['Churidar (Classic)', 'Straight Trousers', 'Dhoti Style']
        }
    },
    {
        id: 'traditional-bandhgala',
        category: 'traditional',
        name: 'Bandhgala / Jodhpuri Suit',
        description: 'The prince\'s choice. High mandarin collar, structured jacket with subtle embroidery or clean lines. Versatile for weddings, receptions, and formal occasions. The epitome of Indian formalwear.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%231a1a2e" width="400" height="533"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="20" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3EBANDHGALA%3C/text%3E%3C/svg%3E',
        features: ['High Mandarin Collar', 'Structured Jacket', 'Subtle Embroidery Option', '5-6 Button Front', 'Tailored Trousers'],
        customizations: {
            fabric: ['Wool Silk Blend', 'Raw Silk', 'Velvet', 'Tussar Silk', 'Linen Silk (Summer)'],
            color: ['Navy', 'Black', 'Charcoal', 'Maroon', 'Emerald', 'Midnight Blue', 'Custom'],
            embroidery: ['None (Clean)', 'Collar Only', 'Collar & Cuffs', 'Full Front Panel'],
            buttons: ['Covered', 'Metal', 'Horn', 'Mother of Pearl'],
            pockets: ['Jetted', 'Flap', 'Ticket Pocket'],
            lining: ['Bemberg', 'Silk', 'Contrast Color']
        }
    },
    {
        id: 'traditional-kurta-pajama',
        category: 'traditional',
        name: 'Designer Kurta Pajama Set',
        description: 'Refined traditional wear for festivals and intimate ceremonies. Fine cotton, linen, or silk kurtas with tailored pajamas. Subtle detailing - contrast placket, cuff detailing, or minimal embroidery.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%23f5f0e8" width="400" height="533"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="20" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3EKURTA PAJAMA%3C/text%3E%3C/svg%3E',
        features: ['Premium Cotton/Linen/Silk', 'Tailored Fit', 'Contrast Details Optional', 'Side Slits', 'Matching Pajama'],
        customizations: {
            fabric: ['Cotton Voile (Summer)', 'Linen Cotton', 'Raw Silk', 'Chanderi', 'Khaddar (Winter)'],
            color: ['White', 'Ivory', 'Cream', 'Pastel Blue', 'Pastel Pink', 'Sage Green', 'Custom'],
            kurtaStyle: ['Straight Cut', 'A-Line', 'Angrakha', 'Asymmetric Hem'],
            collar: ['Mandarin', 'Band', 'Notch', 'Stand Collar'],
            placket: ['Full Button', 'Half Placket', 'Contrast Placket', 'Hidden Placket'],
            embroidery: ['None', 'Collar Only', 'Placket Only', 'Collar & Cuffs', 'Full Yoke']
        }
    },
    {
        id: 'traditional-nehru-jacket',
        category: 'traditional',
        name: 'Nehru Jacket',
        description: 'Versatile layering piece. Wear over a kurta for formal occasions, or over a crisp shirt for smart-casual events. Clean mandarin collar, tailored fit. The modern Indian gentleman\'s blazer alternative.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%232c3e50" width="400" height="533"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="20" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3ENEHRU JACKET%3C/text%3E%3C/svg%3E',
        features: ['Mandarin Collar', 'Tailored Fit', '5-Button Front', 'Jetted/Flap Pockets', 'Fully Lined'],
        customizations: {
            fabric: ['Wool Silk', 'Raw Silk', 'Linen Silk', 'Velvet', 'Brocade', 'Cotton Linen'],
            color: ['Navy', 'Black', 'Charcoal', 'Maroon', 'Bottle Green', 'Gold', 'Custom'],
            buttons: ['Covered', 'Metal', 'Horn', 'Kundan'],
            pockets: ['Jetted', 'Flap', 'Patch'],
            lining: ['Contrast Silk', 'Bemberg', 'Printed'],
            length: ['Standard (Hip)', 'Long (Thigh)', 'Short (Waist)']
        }
    },

    // SMART CASUAL
    {
        id: 'casual-linen-suit',
        category: 'casual',
        name: 'Unstructured Linen Suit',
        description: 'Summer sophistication. Unconstructed jacket with soft shoulders, patch pockets, and half lining. Breathable linen-cotton blend resists wrinkling better than pure linen. Wear as a suit or separates.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%23e8dfd4" width="400" height="533"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="20" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3ELINEN SUIT%3C/text%3E%3C/svg%3E',
        features: ['Linen-Cotton Blend', 'Unstructured Shoulder', 'Patch Pockets', 'Half Lined', 'Drawstring Trousers Option'],
        customizations: {
            fabric: ['Natural Linen', 'Linen-Cotton (55/45)', 'Linen-Silk', 'Blue Linen', 'Navy Linen', 'Sage Linen'],
            color: ['Natural', 'Stone', 'Navy', 'Light Blue', 'Sage', 'Sand', 'White'],
            structure: ['Fully Unstructured', 'Light Shoulder', 'Medium Structure'],
            pockets: ['Patch (Standard)', 'Patch + Flap', 'Jetted'],
            trousers: ['Drawstring (Casual)', 'Belt Loops (Standard)', 'Side Adjusters'],
            lining: ['Unlined (Coolest)', 'Half Lined', 'Quarter Lined']
        }
    },
    {
        id: 'casual-velvet-blazer',
        category: 'casual',
        name: 'Velvet Smoking Jacket',
        description: 'Evening luxury redefined. Plush velvet in deep jewel tones. Shawl collar, silk lining, worn over a turtleneck or dress shirt. The ultimate host\'s jacket for winter entertaining.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%234a006e" width="400" height="533"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="20" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3EVELVET JACKET%3C/text%3E%3C/svg%3E',
        features: ['Premium Velvet', 'Shawl Collar', 'Silk Lining', 'Jetted Pockets', 'Single Button'],
        customizations: {
            color: ['Midnight Blue', 'Burgundy', 'Bottle Green', 'Black', 'Deep Purple'],
            collar: ['Shawl (Classic)', 'Notch', 'Peak'],
            buttons: ['Covered Velvet', 'Satin', 'Metal', 'Horn'],
            pockets: ['Jetted', 'Flap', 'Patch'],
            lining: ['Silk (Tonal)', 'Silk (Contrast)', 'Paisley Silk', 'Custom Monogram'],
            trousers: ['Matching Velvet', 'Wool Flannel', 'Black Tie Trousers']
        }
    },
    {
        id: 'casual-corduroy-suit',
        category: 'casual',
        name: 'Corduroy Suit',
        description: 'Textural sophistication. Fine-wale corduroy in earth tones. Structured enough for the office, relaxed enough for weekend. The autumn/winter staple that adds depth to your rotation.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%235d4e37" width="400" height="533"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="20" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3ECORDUROY SUIT%3C/text%3E%3C/svg%3E',
        features: ['Fine-Wale Corduroy', 'Notch Lapel', 'Flap Pockets', 'Horn Buttons', 'Half Canvas'],
        customizations: {
            color: ['Tobacco', 'Navy', 'Olive', 'Charcoal', 'Burgundy', 'Chocolate'],
            wale: ['Fine (16-21 wale)', 'Medium (11-15 wale)', 'Wide (8-10 wale)'],
            pockets: ['Flap', 'Patch', 'Jetted'],
            buttons: ['Horn', 'Leather', 'Metal', 'Covered'],
            lining: ['Bemberg Tonal', 'Bemberg Contrast', 'Flannel'],
            trousers: ['Plain Front', 'Single Pleat', 'Double Pleat']
        }
    },
    {
        id: 'casual-wool-blazer',
        category: 'casual',
        name: 'Tweed Sport Coat',
        description: 'Heritage style for the modern man. Authentic Harris Tweed or Donegal tweed. Leather elbow patches optional. Patch pockets, hacking pockets available. The countryman\'s elegance.',
        image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533"%3E%3Crect fill="%233d3428" width="400" height="533"/%3E%3Ctext x="200" y="266" font-family="Georgia,serif" font-size="20" fill="%23d4a574" text-anchor="middle" dominant-baseline="middle"%3ETWEED COAT%3C/text%3E%3C/svg%3E',
        features: ['Harris Tweed / Donegal', 'Patch Pockets', 'Leather Elbow Patches Optional', 'Hacking Pockets Option', 'Half Lined'],
        customizations: {
            fabric: ['Harris Tweed', 'Donegal Tweed', 'Shetland Tweed', 'Cheviot Tweed'],
            pattern: ['Herringbone', 'Houndstooth', 'Windowpane', 'Plain', 'Barleycorn'],
            color: ['Brown Mix', 'Green Mix', 'Grey Mix', 'Blue Mix', 'Earth Tones'],
            pockets: ['Patch (Standard)', 'Hacking (Slanted)', 'Flap', 'Patch + Ticket'],
            elbows: ['Leather Patches', 'Suede Patches', 'Self Fabric', 'None'],
            lining: ['Half Lined (Standard)', 'Full Lined', 'Quarter Lined'],
            buttons: ['Horn', 'Leather', 'Metal', 'Wood']
        }
    }
];

// Category display names and icons
const categoryInfo = {
    suits: { name: 'Suits & Blazers', icon: '🎩' },
    shirts: { name: 'Shirts', icon: '👔' },
    traditional: { name: 'Traditional Wear', icon: '👑' },
    casual: { name: 'Smart Casual', icon: '🧥' }
};

// ========================================
// STATE MANAGEMENT
// ========================================
const state = {
    selectedStyles: [],
    activeCategory: 'all',
    currentModalStyle: null,
    isModalOpen: false
};

// ========================================
// DOM ELEMENTS CACHE
// ========================================
const elements = {
    navbar: document.getElementById('navbar'),
    navMenu: document.getElementById('navMenu'),
    navToggle: document.getElementById('navToggle'),
    navLinks: document.querySelectorAll('.nav-link'),
    stylesGrid: document.getElementById('stylesGrid'),
    categoryBtns: document.querySelectorAll('.category-btn'),
    styleModal: document.getElementById('styleModal'),
    modalClose: document.getElementById('modalClose'),
    modalImage: document.getElementById('modalImage'),
    modalCategory: document.getElementById('modalCategory'),
    modalTitle: document.getElementById('modalTitle'),
    modalDescription: document.getElementById('modalDescription'),
    modalFeatures: document.getElementById('modalFeatures'),
    customOptions: document.getElementById('customOptions'),
    selectStyleBtn: document.getElementById('selectStyleBtn'),
    customizeBtn: document.getElementById('customizeBtn'),
    selectionSection: document.getElementById('selectionSection'),
    selectionList: document.getElementById('selectionList'),
    clearSelection: document.getElementById('clearSelection'),
    saveSelection: document.getElementById('saveSelection'),
    contactForm: document.getElementById('contactForm'),
    toastContainer: document.getElementById('toastContainer')
};

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderStyles('all');
    setupEventListeners();
    setupScrollEffects();
    setupFormValidation();
    loadSavedSelection();
    setupSmoothScroll();
}

// ========================================
// EVENT LISTENERS
// ========================================
function setupEventListeners() {
    // Navigation
    elements.navToggle.addEventListener('click', toggleMobileMenu);
    elements.navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Category filters
    elements.categoryBtns.forEach(btn => {
        btn.addEventListener('click', handleCategoryFilter);
    });

    // Modal
    elements.modalClose.addEventListener('click', closeModal);
    elements.styleModal.addEventListener('click', (e) => {
        if (e.target === elements.styleModal.querySelector('.modal-overlay')) {
            closeModal();
        }
    });
    elements.selectStyleBtn.addEventListener('click', handleSelectStyle);
    elements.customizeBtn.addEventListener('click', handleCustomizeStyle);

    // Selection section
    elements.clearSelection.addEventListener('click', clearSelection);
    elements.saveSelection.addEventListener('click', saveSelection);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeydown);

    // Contact form
    elements.contactForm.addEventListener('submit', handleFormSubmit);

    // Input validation on blur
    elements.contactForm.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// ========================================
// NAVIGATION
// ========================================
function toggleMobileMenu() {
    const isExpanded = elements.navToggle.getAttribute('aria-expanded') === 'true';
    elements.navToggle.setAttribute('aria-expanded', !isExpanded);
    elements.navMenu.classList.toggle('active');
    document.body.style.overflow = isExpanded ? '' : 'hidden';
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        closeMobileMenu();
        smoothScrollTo(targetSection);
        updateActiveNavLink(e.currentTarget);
    }
}

function closeMobileMenu() {
    elements.navToggle.setAttribute('aria-expanded', 'false');
    elements.navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

function updateActiveNavLink(activeLink) {
    elements.navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    smoothScrollTo(target);
                }
            }
        });
    });
}

function smoothScrollTo(element) {
    const navbarHeight = elements.navbar.offsetHeight;
    const targetPosition = element.offsetTop - navbarHeight;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// ========================================
// SCROLL EFFECTS
// ========================================
function setupScrollEffects() {
    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Navbar scroll effect
        if (currentScroll > scrollThreshold) {
            elements.navbar.classList.add('scrolled');
        } else {
            elements.navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            elements.navbar.style.transform = 'translateY(-100%)';
        } else {
            elements.navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;

        // Update active nav link based on scroll position
        updateActiveNavOnScroll();
    }, { passive: true });
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = elements.navbar.offsetHeight;
    const scrollPosition = window.scrollY + navbarHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            elements.navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
            });
        }
    });
}

// ========================================
// STYLES RENDERING
// ========================================
function renderStyles(category) {
    const filteredStyles = category === 'all'
        ? stylesData
        : stylesData.filter(style => style.category === category);

    elements.stylesGrid.innerHTML = filteredStyles.map(style => createStyleCard(style)).join('');

    // Add click listeners to new cards
    elements.stylesGrid.querySelectorAll('.style-card').forEach(card => {
        card.addEventListener('click', () => openModal(card.dataset.styleId));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(card.dataset.styleId);
            }
        });
    });

    // Animate cards in
    animateCardsIn();
}

function createStyleCard(style) {
    const isSelected = state.selectedStyles.some(s => s.id === style.id);
    const catInfo = categoryInfo[style.category];

    return `
        <article class="style-card ${isSelected ? 'selected' : ''}" data-style-id="${style.id}" tabindex="0" role="button" aria-label="View ${style.name} details" aria-pressed="${isSelected}">
            <div class="style-image">
                <img src="${style.image}" alt="${style.name}" loading="lazy" width="400" height="533">
                <span class="style-badge">${catInfo.icon} ${catInfo.name}</span>
                ${isSelected ? '<span class="selected-badge" aria-label="Selected">✓ Selected</span>' : ''}
            </div>
            <div class="style-content">
                <span class="style-category">${catInfo.name}</span>
                <h3 class="style-name">${style.name}</h3>
                <p class="style-description">${style.description}</p>
                <div class="style-features">
                    ${style.features.slice(0, 3).map(f => `<span class="feature-tag">${f}</span>`).join('')}
                    ${style.features.length > 3 ? `<span class="feature-tag">+${style.features.length - 3} more</span>` : ''}
                </div>
            </div>
        </article>
    `;
}

function animateCardsIn() {
    const cards = elements.stylesGrid.querySelectorAll('.style-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

function handleCategoryFilter(e) {
    const category = e.currentTarget.dataset.category;

    // Update active button
    elements.categoryBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
        btn.setAttribute('aria-selected', btn.dataset.category === category);
    });

    state.activeCategory = category;
    renderStyles(category);
}

// ========================================
// MODAL
// ========================================
function openModal(styleId) {
    const style = stylesData.find(s => s.id === styleId);
    if (!style) return;

    state.currentModalStyle = style;
    state.isModalOpen = true;

    const catInfo = categoryInfo[style.category];

    // Populate modal
    elements.modalImage.innerHTML = `<img src="${style.image}" alt="${style.name}" width="400" height="533">`;
    elements.modalCategory.textContent = catInfo.name;
    elements.modalTitle.textContent = style.name;
    elements.modalDescription.textContent = style.description;

    // Features
    elements.modalFeatures.innerHTML = style.features
        .map(f => `<span class="feature-tag">${f}</span>`)
        .join('');

    // Customization options
    elements.customOptions.innerHTML = Object.entries(style.customizations)
        .map(([key, options]) => `
            <div class="custom-option">
                <label for="custom-${style.id}-${key}">${formatLabel(key)}</label>
                <select id="custom-${style.id}-${key}" data-option="${key}">
                    ${options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>
            </div>
        `).join('');

    // Update select button text
    const isSelected = state.selectedStyles.some(s => s.id === style.id);
    elements.selectStyleBtn.textContent = isSelected ? 'Remove from Selection' : 'Select This Style';
    elements.selectStyleBtn.classList.toggle('btn-secondary', isSelected);
    elements.selectStyleBtn.classList.toggle('btn-primary', !isSelected);

    // Show modal
    elements.styleModal.hidden = false;
    document.body.style.overflow = 'hidden';

    // Focus management
    setTimeout(() => elements.modalClose.focus(), 100);

    // Trap focus
    trapFocus(elements.styleModal);
}

function closeModal() {
    elements.styleModal.hidden = true;
    document.body.style.overflow = '';
    state.isModalOpen = false;
    state.currentModalStyle = null;
    releaseFocusTrap();
}

function handleSelectStyle() {
    if (!state.currentModalStyle) return;

    const style = state.currentModalStyle;
    const existingIndex = state.selectedStyles.findIndex(s => s.id === style.id);

    if (existingIndex >= 0) {
        // Remove from selection
        const removed = state.selectedStyles.splice(existingIndex, 1)[0];
        showToast(`Removed "${removed.name}" from selection`, 'info');
    } else {
        // Add to selection with customizations
        const customizations = getSelectedCustomizations();
        state.selectedStyles.push({ ...style, customizations });
        showToast(`Added "${style.name}" to selection`, 'success');
    }

    updateSelectionUI();
    renderStyles(state.activeCategory);
    closeModal();
}

function handleCustomizeStyle() {
    if (!state.currentModalStyle) return;

    // Scroll to customization section in modal
    const customSection = elements.styleModal.querySelector('.modal-customization');
    if (customSection) {
        customSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Highlight customization options
    elements.styleModal.querySelectorAll('.custom-option select').forEach((select, index) => {
        setTimeout(() => select.focus(), index * 100);
    });
}

function getSelectedCustomizations() {
    const customizations = {};
    elements.styleModal.querySelectorAll('.custom-option select').forEach(select => {
        customizations[select.dataset.option] = select.value;
    });
    return customizations;
}

// ========================================
// SELECTION MANAGEMENT
// ========================================
function updateSelectionUI() {
    const hasSelection = state.selectedStyles.length > 0;
    elements.selectionSection.hidden = !hasSelection;

    if (hasSelection) {
        elements.selectionList.innerHTML = state.selectedStyles.map((style, index) => `
            <div class="selection-item" data-index="${index}">
                <div class="selection-info">
                    <span class="selection-category">${categoryInfo[style.category].icon} ${categoryInfo[style.category].name}</span>
                    <h4 class="selection-name">${style.name}</h4>
                    ${style.customizations ? `
                        <div class="selection-customizations">
                            ${Object.entries(style.customizations).map(([key, value]) =>
                                `<span class="custom-tag">${formatLabel(key)}: ${value}</span>`
                            ).join('')}
                        </div>
                    ` : ''}
                </div>
                <button class="btn btn-text selection-remove" aria-label="Remove ${style.name}">Remove</button>
            </div>
        `).join('');

        // Add remove listeners
        elements.selectionList.querySelectorAll('.selection-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.closest('.selection-item').dataset.index);
                removeFromSelection(index);
            });
        });
    }
}

function removeFromSelection(index) {
    const removed = state.selectedStyles.splice(index, 1)[0];
    showToast(`Removed "${removed.name}" from selection`, 'info');
    updateSelectionUI();
    renderStyles(state.activeCategory);
}

function clearSelection() {
    if (state.selectedStyles.length === 0) return;

    if (confirm('Clear all selected styles?')) {
        state.selectedStyles = [];
        updateSelectionUI();
        renderStyles(state.activeCategory);
        showToast('Selection cleared', 'info');
    }
}

function saveSelection() {
    if (state.selectedStyles.length === 0) return;

    const data = {
        styles: state.selectedStyles,
        savedAt: new Date().toISOString()
    };

    localStorage.setItem('jagger_selection', JSON.stringify(data));
    showToast('Selection saved for later', 'success');
}

function loadSavedSelection() {
    try {
        const saved = localStorage.getItem('jagger_selection');
        if (saved) {
            const data = JSON.parse(saved);
            // Validate data structure
            if (data.styles && Array.isArray(data.styles)) {
                state.selectedStyles = data.styles;
                updateSelectionUI();
            }
        }
    } catch (e) {
        console.warn('Failed to load saved selection:', e);
    }
}

// ========================================
// FOCUS MANAGEMENT (Modal)
// ========================================
let focusTrapElements = [];

function trapFocus(element) {
    focusTrapElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusTrapElements[0];
    const lastElement = focusTrapElements[focusTrapElements.length - 1];

    element.addEventListener('keydown', handleFocusTrap);
    firstElement?.focus();
}

function releaseFocusTrap() {
    const modal = elements.styleModal;
    modal.removeEventListener('keydown', handleFocusTrap);
    focusTrapElements = [];
}

function handleFocusTrap(e) {
    if (e.key !== 'Tab') return;

    const firstElement = focusTrapElements[0];
    const lastElement = focusTrapElements[focusTrapElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
    }
}

function handleKeydown(e) {
    if (e.key === 'Escape' && state.isModalOpen) {
        closeModal();
    }
}

// ========================================
// FORM VALIDATION
// ========================================
function setupFormValidation() {
    const form = elements.contactForm;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        field.addEventListener('invalid', (e) => {
            e.preventDefault();
            showFieldError(field, getErrorMessage(field));
        });
    });
}

function validateField(e) {
    const field = e.target;
    const errorElement = field.parentElement.querySelector('.error-message');

    if (field.checkValidity()) {
        clearFieldError(field);
        return true;
    } else {
        showFieldError(field, getErrorMessage(field));
        return false;
    }
}

function clearFieldError(field) {
    const errorElement = field.parentElement.querySelector('.error-message');
    field.classList.remove('error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function showFieldError(field, message) {
    const errorElement = field.parentElement.querySelector('.error-message');
    field.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function getErrorMessage(field) {
    if (field.validity.valueMissing) {
        return `${getFieldLabel(field)} is required`;
    }
    if (field.validity.typeMismatch) {
        if (field.type === 'email') return 'Please enter a valid email address';
        if (field.type === 'tel') return 'Please enter a valid phone number';
    }
    if (field.validity.patternMismatch) {
        return 'Please check the format';
    }
    return 'Invalid input';
}

function getFieldLabel(field) {
    const label = field.parentElement.querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : 'This field';
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    // Validate all fields
    let isValid = true;
    form.querySelectorAll('[required]').forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });

    if (!isValid) {
        showToast('Please fix the errors above', 'error');
        return;
    }

    // Prepare data
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        occasion: formData.get('occasion') || 'Not specified',
        message: formData.get('message'),
        updates: formData.get('updates') === 'on',
        selectedStyles: state.selectedStyles.map(s => ({
            name: s.name,
            category: s.category,
            customizations: s.customizations
        })),
        timestamp: new Date().toISOString()
    };

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Booking...';

    try {
        // Simulate API call
        await simulateApiCall(data);

        showToast('Consultation booked! We\'ll contact you within 24 hours.', 'success');
        form.reset();
        clearSelection();

        // Scroll to top of contact section
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) {
        showToast('Booking failed. Please call us directly at +91 90909 09009', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Book Consultation';
    }
}

function simulateApiCall(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Booking submitted:', data);
            resolve({ success: true, bookingId: 'JGR-' + Date.now() });
        }, 1500);
    });
}

// ========================================
// TOAST NOTIFICATIONS
// ========================================
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');

    const icons = {
        success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
        warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
    };

    toast.innerHTML = `
        <div class="toast-icon">${icons[type] || icons.info}</div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" aria-label="Dismiss">&times;</button>
    `;

    elements.toastContainer.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Auto dismiss
    const dismissTimeout = setTimeout(() => dismissToast(toast), 5000);

    // Manual dismiss
    toast.querySelector('.toast-close').addEventListener('click', () => {
        clearTimeout(dismissTimeout);
        dismissToast(toast);
    });
}

function dismissToast(toast) {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function formatLabel(str) {
    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, c => c.toUpperCase())
        .trim();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================
// Add focus styles for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Announce selection changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// ========================================
// PERFORMANCE: Lazy load images
// ========================================
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
setupLazyLoading();

// ========================================
// SERVICE WORKER REGISTRATION (PWA ready)
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration would go here
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ========================================
// EXPORT FOR TESTING
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stylesData,
        categoryInfo,
        state,
        renderStyles,
        openModal,
        closeModal,
        validateField,
        showToast
    };
}