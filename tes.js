// function wait_promise(ms) 
// 	{
// 		return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 		resolve(ms);
// 		}, ms )
// 		})
// 	}  


// async function run()
// {
//    for(var x  = 0; x < 10; x++){

//     let a = await   wait_promise(3000); 
//     console.log(a);
//    }
// }
// run()

// const traveler = [
// 	{ _id: '60b47e9faad24e0015a3f782', price: '23.00' },
// 	{ _id: '60b47e9faad24e0015a3f783', price: '10.00' },
// 	{ _id: '60b47e9faad24e0015a3f783', price: '10.00' },
// 	{ _id: '60b47e9faad24e0015a3f783', price: '10.00' }
// ];
// let sum = traveler.reduce((n, { price }) => Number(n) + Number(price), 0)
// console.log(sum)


$(document).ready(function () {
	function reset_pass(id, pass) {
		console.log("reset_pass");
		$.ajax({
			url: "https://www.theushop.in/account/reset?form_type=reset_customer_password&utf8=%E2%9C%93&customer%5Bpassword%5D=" + pass + "&customer%5Bpassword_confirmation%5D=" + pass + "&id=" + id,
			type: "post",
			async: false,
			success: function (data) {
				console.log("data sucess=====");
				console.log(data);
			}, error: function (jqXHR, exception) {
				console.log("data error=====");
				console.log(jqXHR.status);
				console.log(exception);
			}
		});

	}

	function login_customer(cust_id, cust_email, cust_password) {

		//     console.log("login_customer");
		//     $("#login_details_email").val(cust_email);
		//     $("#login_details_password").val(cust_password);  


		//     setTimeout(function () {
		//       $("#login_details_submit").trigger('click');
		//     }, 1000);

		$("#error_without_from_submit_mobile").hide();
		var login_url = "https://www.theushop.in/account/login?form_type=customer_login&utf8=%E2%9C%93&customer%5Bemail%5D=" + cust_email + "&customer%5Bpassword%5D=" + cust_password;
		console.log(login_url);
		$.ajax({
			url: login_url,
			type: "post",
			async: false,
			success: function (data) {
				console.log("data sucess=====");

				var error = $(data).find(".Alert--error").text();
				var redirect_after_login = localStorage.getItem('redirect_after_login');
				console.log(error);
				if ((error == "") && (redirect_after_login == "1")) {
					//window.location.href = "/checkout";
					window.location.href = "/account";
				} else if ((error == "") && (redirect_after_login == "0")) {
					window.location.href = "/account";
				} else {

					$("#error_without_from_submit_mobile").text(error);
					$("#error_without_from_submit_mobile").show();
				}

			}, error: function (jqXHR, exception) {
				console.log("data error=====");
				console.log(jqXHR.status);
				console.log(exception);
			}
		});
	}

	function registerUser(cust_id, cust_email, cust_password) {
		console.log("registerUser");
		var mobile_number_value = $("#mobile_number_value").val();
		var email_mobile_login = mobile_number_value + "@example.com";
		var pass_mobile_login = mobile_number_value;
		localStorage.setItem('password_login', pass_mobile_login);
		$("#email_mobile_login").val(email_mobile_login);
		$("#password_mobile_login").val(pass_mobile_login);
		$("#phone_mobile_login").val(mobile_number_value);
		setTimeout(function () {
			$("#Create_my_account").trigger('click');
		}, 1000);

	}
	function Create_my_account(cust_id, cust_email, cust_password) {
		console.log("already_registerUser");
		$("#already_reg_user").show();
		$("#uid").val(cust_id);
		$("#div_mobile_number_otp").hide();
		$("#div_mobile_number_value").hide();
	}

	function insert_data_database(newPass, uid) {
		var get_data_url = "https://www.ens.enterprises/multibrand/customers/customer_data.php?case=insert_data&id=" + uid + "&pass=" + newPass;
		console.log(get_data_url);
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			console.log(this.responseText);
			var json_data = JSON.parse(this.responseText);
			console.log(json_data);
			var status = json_data.status;
			var otp_msg = json_data.msg;
			if (this.readyState == 4 && this.status == 200) {
				if (status == "success") {
					reset_pass(uid, newPass);

				}


			}
		};
		xhttp.open("POST", get_data_url, true);
		xhttp.send();
	}

	$("#Change_pass").click(function () {
		var newPass = $("#pass_already_user").val();
		var uid = $("#uid").val();
		insert_data_database(newPass, uid);
	});



	$('.send_code').click(function () {
		//var mobNumber = $(this).parent().find('input').val();
		var mobNumber = $("#mobile_number_value").val();
		//var substr = mobNumber.substring(mobNumber.length-4, mobNumber.length);
		//$('#mobileNumberOTP').text('+91******'+substr);
		mobileVerification(mobNumber);
	});

	function mobileVerification(mobNumber) {
		//var mobUrl = "http://newpetsessentia.ens.enterprises/index.php?mobile_number="+mobNumber;
		var mobUrl = "https://www.ens.enterprises/multibrand/customers/send_otp.php?mobile_number=" + mobNumber;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				//countdown(31);
				console.log(this.responseText);
				$("#div_mobile_number_value").hide();
				//$(".mobile_numbers_otp").val(mobNumber);
				$("#div_mobile_number_otp").show();

			}
		};
		xhttp.open("GET", mobUrl, true);
		xhttp.send();
	}
	$('#mobile_number_value').keyup(function (e) {

		var phoneNum = $(this).val();
		var phone_regex = /^[6789][0-9]{4}([ ]?)[0-9]{5}$/;
		//var phone_regex = /^$/;
		if (!phone_regex.test(phoneNum)) {
			$('#phone_error').show();
			$('.send_code').prop('disabled', true);
		}
		else {
			$('#phone_error').hide();
			$('.send_code').prop('disabled', false);
		}

	});
	$('.verify_code').click(function () {
		//var mobNumber = $('.mobile_numbers_otp').val();
		var mobNumber = $("#mobile_number_value").val();
		var otpNumber = $("#mobile_number_otp").val();
		//        $('.digit-group input').each(function(){
		//          otpNumber += $(this).val();
		//        });
		//var mobotpUrl = "http://newpetsessentia.ens.enterprises/checkOtp.php?mobile_no="+mobNumber+"&otp_code="+otpNumber;
		var mobotpUrl = "https://www.ens.enterprises/multibrand/customers/check_otp.php?mobile_no=" + mobNumber + "&otp_code=" + otpNumber;

		console.log(mobotpUrl);
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				//insert_data_database(newPass,uid);
				var json_data = JSON.parse(this.responseText);
				console.log(json_data);
				var status = json_data.status;
				var otp_msg = json_data.msg;

				if (status == "success") {
					localStorage.setItem('mobile_number_login', mobNumber);
					$(".otp_msg_failed").hide();
					$(".otp_msg_success").show();
					var url_get_data = "https://www.ens.enterprises/multibrand/customers/customer_update.php?mobile=" + mobNumber + "&case=get_data";
					console.log(url_get_data);
					var xhttpp = new XMLHttpRequest();
					xhttpp.onreadystatechange = function () {
						if (this.readyState == 4 && this.status == 200) {
							//console.log(data1);
							//var customer_details =JSON.parse(JSON.stringify(data1));
							console.log(this.responseText);
							console.log(JSON.parse(this.responseText));
							var customer_details = JSON.parse(this.responseText);
							console.log(customer_details);
							var cust_id = customer_details.id;
							var cust_email = customer_details.email;
							var cust_password = customer_details.pass;
							console.log(cust_id);
							console.log(cust_email);
							console.log(cust_password);

							if ((cust_id == "") && (cust_password == "")) {
								registerUser(cust_id, cust_email, cust_password);
							} else if ((cust_id != "") && (cust_password == "")) {
								//already_registerUser(cust_id, cust_email , cust_password);
								registerUser(cust_id, cust_email, cust_password);
							} else if ((cust_id != "") && (cust_password != "")) {
								login_customer(cust_id, cust_email, cust_password);
							}
						}
					};
					xhttpp.open("GET", url_get_data, true);
					xhttpp.send();

				} else {
					$(".otp_msg_failed").show();
					$(".otp_msg_success").hide();
				}
			}
		};
		xhttp.open("GET", mobotpUrl, true);
		xhttp.send();
	});

	var body_class = $('body').attr("class");
	if (body_class.match("template-account")) {
		var header_height = $("#shopify-section-header").height();
		var update_section_data_top = $('.update_section_data').position().top;
		var scrollTop_height = parseInt(update_section_data_top) - parseInt(header_height);
		console.log("***********scrollTop_height****************");
		console.log(scrollTop_height);
		$('html, body').animate({ scrollTop: scrollTop_height }, 'slow');

		var mobile_update = localStorage.getItem('mobile_number_login');
		var password = localStorage.getItem('password_login');
		var customer_id_update = $("#c_uid").val();
		//alert(customer_id_update);
		if (password != null) {
			insert_data_database(password, customer_id_update);
		}
		var url_update_mobile = "https://www.ens.enterprises/multibrand/customers/customer_update.php?customerId=" + customer_id_update + "&mobile=" + mobile_update + "&case=update_mobile";
		console.log(url_update_mobile);

		var xhttppp = new XMLHttpRequest();
		xhttppp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				//countdown(31);
				var data = this.responseText;
				console.log(this.responseText);
				console.log(data);
				if (data == '3') {
					console.log("phone number is updated");
				} else {
					xhttppp.open("GET", url_update_mobile, true);
					xhttppp.send();
				}

			}
		};
		xhttppp.open("GET", url_update_mobile, true);
		xhttppp.send();
	}

	$("#update_user_details_submit").click(function () {
		$("#error_without_from_submit_after_update").hide();
		var uid = $("#c_uid").val();
		var em = $("#update_user_details_email").val();
		var fn = $("#update_user_details_firstname").val();
		var ln = $("#update_user_details_lastname").val();
		if ((em != "") && (fn != "") && (ln != "")) {
			var url_update_mobile = "https://www.ens.enterprises/multibrand/customers/customer_update.php?uid=" + uid + "&em=" + em + "&ln=" + ln + "&fn=" + fn + "&case=update_all";
			console.log("update_user_details_submit");
			console.log(url_update_mobile);
			var xhttppp = new XMLHttpRequest();
			xhttppp.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					//countdown(31);
					var data = this.responseText;
					console.log(this.responseText);
					console.log(data);

					if (data == '3') {
						//alert("Fields are updated");
						var redirect_after_login = localStorage.getItem('redirect_after_login');
						//console.log(error);
						if ((redirect_after_login == "1")) {
							window.location.href = "/checkout";

						} else if ((redirect_after_login == "0")) {
							window.location.href = "/account";
						}
					} else {
						//alert("Something went wrong please try again ");
						if (data == '1') {

							xhttppp.open("GET", url_update_mobile, true);
							xhttppp.send();
						} else {
							$("#error_without_from_submit_after_update").text(data).show();
						}
					}

				}
			};
			xhttppp.open("GET", url_update_mobile, true);
			xhttppp.send();
		} else {
			var error_msg = "all fields are mandatory";
			$("#error_without_from_submit_after_update").text(error_msg).show();
		}
	});



	/*******************start extra code according to client requirement**********************/
	//setTimeout(()=>{$('.login-pop-up-mobile').show()},3000); // no need now
	//localStorage.setItem('redirect_after_login', "0");
	$('.icon-popup-close .bx-close-xsvg').click(function () {
		$(this).closest('.login-pop-up-mobile').hide();
	});


	$('.location-icon +.Header__Icon,.mob_login_customer').click(function (event) {
		console.log(window.theme.isCustomer)
		if (window.theme.isCustomer) {
		} else {
			event.preventDefault();
			localStorage.setItem('redirect_after_login', "0");
			$('.login-pop-up-mobile').show();
		}


	});


	$('body').delegate('.openlogin span', 'click', function () {
		localStorage.setItem('redirect_after_login', "1");
		$(".Drawer__Close.Icon-Wrapper--clickable").trigger('click');
		$('.login-pop-up-mobile').show();
	});

	/*******************end extra code according to client requirement**********************/
});