package com.zosh.service;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.zosh.model.Order;
import com.zosh.model.PaymentResponse;
import com.zosh.model.User;

public interface PaymentService {
	
	public PaymentResponse generatePaymentLink(Order order) throws StripeException;
	PaymentResponse createRazorpayPaymentLink(Order order) throws RazorpayException;
}