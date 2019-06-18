// Xóa sản phẩm simple
$(".post_delete_customer").click(function() {
  var deleteCustomerID = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/customer/customer-delete",
    data: { CustomerID: deleteCustomerID },
    success: function(data) {
      if (data) {
        //load lại trang
        window.location.href = location.href;
      } else {
        $(".alert_modal").click();
      }
    }
  });
});

// Xóa sản phẩm simple
$(".post_modal_delete_customer").click(function() {
  var deleteCustomerID = $("#modal-customer-id").text();

  $.ajax({
    type: "POST",
    url: "/admin/customer/customer-delete",
    data: { CustomerID: deleteCustomerID },
    success: function(data) {
      if (data) {
        //load lại trang
        window.location.href = location.href;
      } else {
        $("#alert-delete-customer").remove();
        var alert =
          '<div class="alert alert-warning alert-dismissible fade show" id="alert-delete-customer" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Không thể xóa khách hàng</div>';
        $("#modal-image").prepend(alert);
      }
    }
  });
});

// Cập nhật customer type
$(".post_customer_type_update").click(function() {
  var customerTypeId = $("#customerTypeId").val();
  var customerId = $("#modal-customer-id").text();
  
  $.ajax({
    type: "POST",
    url: "/admin/customer/customer-type-update",
    data: { CustomerID: customerId, CustomerTypeID: customerTypeId },
    success: function(data) {
      if (data) {
        $("#customerTypeId").val(customerTypeId);

        $("#alert-update-customer-type").remove();
        var alert =
          '<div class="alert alert-success alert-dismissible fade show" id="alert-update-customer-type" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Cập nhật loại khách hàng thành công</div>';
        $("#modal-image").prepend(alert);
      } else {
        $("#alert-update-customer-type").remove();
        var alert =
          '<div class="alert alert-warning alert-dismissible fade show" id="alert-update-customer-type" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Cập nhật loại khách hàng thất bại</div>';
        $("#modal-image").prepend(alert);
      }
    }
  });
});

$(".post_modal_get_info").click(function() {
  var customerID = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/customer/customer-info",
    data: { CustomerID: customerID },
    success: function(data) {
      var customer = data.customer;
      var customerType = data.customerType;

      $("#modal-customer-image").attr("src", customer.IMAGE);
      $("#modal-customer-id").text(customer.ID);
      $("#modal-customer-name").text(customer.FULLNAME);
      $("#modal-customer-username").text(customer.USERNAME);
      $("#modal-customer-email").text(customer.EMAIL);
      if (!customer.BIRTHDATE) {
        $("#modal-customer-birthdate").text("Không có thông tin");
      } else {
        $("#modal-customer-birthdate").text(customer.BIRTHDATE);
      }
      $("#modal-customer-cash").text(customer.CASH + "đ");
      $("#modal-customer-created").text(customer.CREATED);

      $("#customerTypeId option").each(function() {
        $(this).remove();
      });

      customerType.forEach(type => {
        $("#customerTypeId").append(
          $("<option>", {
            value: type.ID,
            text: type.NAME
          })
        );
      });

      $("#customerTypeId").append(
        '<option value="' +
          customer.CUSTOMERTYPEID +
          '" selected>' +
          customer.TYPENAME +
          "</option>"
      );

      $("#alert-update-customer-type").remove();
      $("#alert-delete-customer").remove();
    }
  });
});

$("#customerDetailModal").on("hidden.bs.modal", function(e) {
  //load lại trang
  window.location.href = location.href;
});

//Tìm kiếm
$("#btn_search").click(function() {
  var inputName = $("#name").val();

  var query = CreateQuery(inputName);
  var base_url =
    location.protocol + "//" + document.domain + ":" + location.port;
  if (query != "") {
    //Chuyển trang
    window.location = base_url + `/admin/customer/customer-show?${query}`;
  } else {
    window.location = base_url + `/admin/customer/customer-show`;
  }
});

function CreateQuery(name) {
  var data = {
    name: name
  };

  return encodeQueryData(data);
}

function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
        if (data[d] != 0) {
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        }
    return ret.join('&');
}
