import React, { useState, useEffect } from 'react';

const TradeForm = ({ trade, onFormSubmit }) => {
    const [formData, setFormData] = useState({
        symbol: '',
        entryPrice: '',
        exitPrice: '',
        positionSize: '',
        tradeType: '',
        entryDate: '',
        exitDate: '',
        notes: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (trade) {
            console.log('Editing trade:', trade);

            const {
                symbol,
                entryPrice,
                exitPrice,
                positionSize,
                tradeType,
                entryDate,
                exitDate,
                notes,

            } = trade;
    
            setFormData({
                symbol: symbol || '',
                entryPrice: entryPrice || '',
                exitPrice: exitPrice || '',
                positionSize: positionSize || '',
                tradeType: tradeType || '',
                entryDate: entryDate ? entryDate.split('T')[0] : '',
                exitDate: exitDate ? exitDate.split('T')[0] : '',
                notes: notes || '',
            });
        } else {

            setFormData({
                symbol: '',
                entryPrice: '',
                exitPrice: '',
                positionSize: '',
                tradeType: '',
                entryDate: '',
                exitDate: '',
                notes: '',
            });
        }
    }, [trade]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key] || formData[key].toString().trim() === '') {
                newErrors[key] = 'This field is required';
            }
        });
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');

        const validationErrors = validateForm();
        console.log('Validation Errors:', validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            
            setErrors(validationErrors);
            return;
        }
        console.log('Form data before submission:', formData)
        onFormSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                placeholder="Symbol"
                required
            />
            {errors.symbol && <div style={{ color: 'red' }}>{errors.symbol}</div>}

            <input
                name="entryPrice"
                type="number"
                value={formData.entryPrice}
                onChange={handleChange}
                placeholder="Entry Price"
                required
            />
            {errors.entryPrice && <div style={{ color: 'red' }}>{errors.entryPrice}</div>}

            <input
                name="exitPrice"
                type="number"
                value={formData.exitPrice}
                onChange={handleChange}
                placeholder="Exit Price"
                required
            />
            {errors.exitPrice && <div style={{ color: 'red' }}>{errors.exitPrice}</div>}

            <input
                name="positionSize"
                type="number"
                value={formData.positionSize}
                onChange={handleChange}
                placeholder="Position Size"
                required
            />
            {errors.positionSize && <div style={{ color: 'red' }}>{errors.positionSize}</div>}

            <input
                name="tradeType"
                value={formData.tradeType}
                onChange={handleChange}
                placeholder="Trade Type"
                required
            />
            {errors.tradeType && <div style={{ color: 'red' }}>{errors.tradeType}</div>}

            <label>Entry:</label>
            <input
                type="date"
                name="entryDate"
                value={formData.entryDate}
                onChange={handleChange}
                required
            />
            {errors.entryDate && <div style={{ color: 'red' }}>{errors.entryDate}</div>}

            <label>Exit:</label>
            <input
                type="date"
                name="exitDate"
                value={formData.exitDate}
                onChange={handleChange}
                required
            />
            {errors.exitDate && <div style={{ color: 'red' }}>{errors.exitDate}</div>}

            <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Notes"
                required
            ></textarea>
            {errors.notes && <div style={{ color: 'red' }}>{errors.notes}</div>}

            <button type="submit">{trade ? 'Update Trade' : 'Add Trade'}</button>
        </form>
    );
};

export default TradeForm;