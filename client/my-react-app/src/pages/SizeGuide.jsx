
// SizeGuide.jsx
import React from 'react';
import './infoPages.css';
import { FaRulerCombined } from 'react-icons/fa';

const SizeGuide = () => (
  <div className="info-container">
    <div className="info-content">
      <h1><FaRulerCombined /> Size Guide</h1>
      <p>Use this guide to determine your perfect fit. Measurements are in inches.</p>
      <table className="size-table">
        <thead>
          <tr>
            <th>Size</th>
            <th>Bust</th>
            <th>Waist</th>
            <th>Hips</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>XS</td><td>32</td><td>24</td><td>34</td></tr>
          <tr><td>S</td><td>34</td><td>26</td><td>36</td></tr>
          <tr><td>M</td><td>36</td><td>28</td><td>38</td></tr>
          <tr><td>L</td><td>38</td><td>30</td><td>40</td></tr>
          <tr><td>XL</td><td>40</td><td>32</td><td>42</td></tr>
          <tr><td>XXL</td><td>42</td><td>34</td><td>44</td></tr>
        </tbody>
      </table>
      <p>Tip: If you're in between sizes, consider sizing up for a comfortable fit.</p>
    </div>
  </div>
);

export default SizeGuide;
