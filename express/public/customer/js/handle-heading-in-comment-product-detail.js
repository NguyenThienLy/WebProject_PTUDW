$(document).ready(function() {
  var star = 1;

  // Kiểm tra đã đăng nhập chưa
  $(document).on(
    "click",
    "#divContainAllAboutComment #btnHeadingShowPostCommentProductDetail",
    function() {
      $.post("/customer/auth/check-is-login", function(data) {
        if (data === "true") {
          // $(document).on(
          //   "click",
          //   "#divContainAllAboutComment #product-detail-accordion-post-comment-collapse #btnPostCommentProductDetail",
          //   function() {
          //     var $idProductDetail = $(this).attr("id-product-detail");
          //     var $id = $(this).attr("id-product");
          //     var isSimple = $(this).attr("is-simple") === "true";
          //     var title = $(
          //       "#divContainAllAboutComment #product-detail-accordion-post-comment-collapse #product-detail-nav-collapse-show-rate-comment-title"
          //     ).val();
          //     var content = $(
          //       "#divContainAllAboutComment #product-detail-accordion-post-comment-collapse #product-detail-nav-collapse-show-rate-comment-content"
          //     ).val();

          //     $.post(
          //       "/customer/product/post-comment-product-detail",
          //       {
          //         idProduct: $id,
          //         isSimple: isSimple,
          //         starComment: star,
          //         titleComment: title,
          //         contentComment: content
          //       },
          //       function(data) {
          //         if (data === "fail") {
          //           $("#not-show-comment-product-modal").modal();
          //         } else {
          //           clearOldContentHeading();
          //           emptyContainCommentHeading();
          //           updateQuantityCommentHeading();
          //           showCommentInProductHeading(JSON.parse(data));
          //         }
          //       }
          //     );
          //   }
          // );

          $("#formTabProductDetail").validate({
            rules: {
              TITLE: {
                required: true,
                minlength: 10,
                maxlength: 200
              },
              CONTENT: {
                required: true,
                minlength: 50,
                maxlength: 2000
              }
            },
            messages: {
              TITLE: {
                required: "Bạn cần nhập tiêu đề bình luận.",
                minlength: "Bạn cần nhập ít nhất 10 kí tự.",
                maxlength: "Bạn cần nhập nhiều nhất 20 kí tự."
              },
              CONTENT: {
                required: "Bạn cần nhập nội dung bình luận.",
                minlength: "Bạn cần nhập ít nhất 50 kí tự.",
                maxlength: "Bạn cần nhập nhiều nhất 2000 kí tự."
              }
            },
          
            errorElement: "small",
            errorClass: "help-block text-danger is-invalid",
            validClass: "is-valid",
            submitHandler: function(form) {
              var $idProductDetail = $(this).attr("id-product-detail");
              var $id = $(this).attr("id-product");
              var isSimple = $(this).attr("is-simple") === "true";
              var title = $(
                "#divContainAllAboutComment #product-detail-accordion-post-comment-collapse #product-detail-nav-collapse-show-rate-comment-title"
              ).val();
              var content = $(
                "#divContainAllAboutComment #product-detail-accordion-post-comment-collapse #product-detail-nav-collapse-show-rate-comment-content"
              ).val();
              alert()

              $.post(
                "/customer/product/post-comment-product-detail",
                {
                  idProduct: $id,
                  isSimple: isSimple,
                  starComment: star,
                  titleComment: title,
                  contentComment: content
                },
                function(data) {
                  if (data === "fail") {
                    $("#not-show-comment-product-modal").modal();
                  } else {
                    alert(data);
                    clearOldContentHeading();
                    emptyContainCommentHeading();
                    updateQuantityCommentHeading();
                    showCommentInProductHeading(JSON.parse(data));
                  }
                }
              );
            }
          });

          $(document).on(
            "click",
            "#divContainAllAboutComment #product-detail-accordion-post-comment-collapse .rate > input",
            function() {
              star = $(this).attr("value");
            }
          );
        } else {
          // $("#divContainAllAboutComment > #product-detail-accordion-post-comment-collapse").removeClass("show");

          // $("#divContainAllAboutComment > #product-detail-accordion-post-comment-collapse").removeClass("show");

          $("#divContainAllAboutComment > #product-detail-accordion-post-comment-collapse").on(
            "shown.bs.collapse",
            function() {
              $(
                "#divContainAllAboutComment > #product-detail-accordion-post-comment-collapse"
              ).removeClass("show");
            }
          );

          $("#not-login-system-modal").modal();

          $(document).on(
            "click",
            "#not-login-system-modal #btnAceptLoginSystem",
            function() {
              $("#header-user-modal").modal();
            }
          );
        }
      });
    }
  );

  function clearOldContentHeading() {
    $(
      "#divContainAllAboutComment #product-detail-accordion-post-comment-collapse #product-detail-nav-collapse-show-rate-comment-title"
    ).val("");
    $(
      "#divContainAllAboutComment #product-detail-accordion-post-comment-collapse #product-detail-nav-collapse-show-rate-comment-content"
    ).val("");

    $(
      "#divContainAllAboutComment #product-detail-accordion-post-comment-collapse .rate > input"
    ).prop("checked", false);
    $(
      `#divContainAllAboutComment #product-detail-accordion-post-comment-collapse .rate > input[id="inputRate1"]`
    ).prop("checked", true);

    $(
      "#divContainAllAboutComment > #product-detail-accordion-post-comment-collapse"
    ).removeClass("show");
  }

  function emptyContainCommentHeading() {
    $("#divContainAllAboutComment #divContainCommentsProductDetail").empty();
  }

  function updateQuantityCommentHeading() {
    $("#strongQuantityCommentProductDetail").text(
      +$("#strongQuantityCommentProductDetail").text() + 1
    );
  }

  function showCommentInProductHeading(data) {
    var i;
    for (i = 0; i < data.length; i++) {
      var strStartComment = addStarCommentHeading(data[i].rateStar);
      var strStartCommentUncheck = addStarCommentUncheckHeading(
        data[i].rateStarUncheck
      );
      var verifyProduct = addVerifyHeading(data[i].VERIFYCATION);

      appendCommentInProductDetailHeading(
        data[i],
        strStartComment,
        strStartCommentUncheck,
        verifyProduct
      );
    }
  }

  function addStarCommentHeading(startComments) {
    var strStartComment = "";
    for (var i = 0; i < startComments.length; i++)
      strStartComment += ` <span class="fa fa-star checked"></span>`;

    return strStartComment;
  }

  function addStarCommentUncheckHeading(startCommentsUncheck) {
    var strStartCommentUncheck = "";
    for (var i = 0; i < startCommentsUncheck.length; i++)
      strStartCommentUncheck += ` <span class="fa fa-star"></span>`;

    return strStartCommentUncheck;
  }

  function addVerifyHeading(isVerify) {
    if (isVerify === 1)
      return `<div class="prove-buy">
          <i class="fas fa-check-circle mr-1"></i>
          <span>Đã mua sản phẩm</span>
          </div>`;

    return `<div class="prove-not-buy">
      <i class="fas fa-ban mr-1"></i>
      <span>Chưa mua sản phẩm</span>
      </div>`;
  }

  function appendCommentInProductDetailHeading(
    comment,
    strStartComment,
    strStartCommentUncheck,
    verifyProduct
  ) {
    $("#divContainAllAboutComment #divContainCommentsProductDetail").append(`
        <div class="component-comment row ml-0 mr-0 mt-3">
        <div class="content-left col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <div class="img-avatar">
                <img src="${
                  comment.IMAGE
                }" class="w-100 rounded-circle" alt="" />
            </div>
  
            <h5 class="mt-3 mb-0 text-center font-weight-bold full-name">
            ${comment.FULLNAME}
            </h5>
  
            <p class="mt-0 text-center time-post-cmt">
            ${comment.CREATED}
            </p>
        </div>
  
        <div class="content-top col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-1">
            <h5 class="full-name mb-0 mr-2 font-weight-bold d-inline-block">
            ${comment.FULLNAME}
            </h5>
            <span class="mb-0 time-post-comment">
                <span>(</span>${comment.CREATED}<span>)</span>
            </span>
        </div>
  
        <div class="content-right col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
            <div class="d-inline-block mr-2 rate-star">
                ${strStartComment}
  
                ${strStartCommentUncheck}
            </div>
  
            <span class="rate-text">${comment.TITLE}</span>
  
            ${verifyProduct}
  
            <p class="mt-2 mb-2 main-content">
              ${comment.COMMENT}
            </p>
  
            <div class="d-flex justify-content-between align-items-center interactive-customer">
                <a href="#" class="text-decoration-none">Số lượt cảm ơn <strong>5</strong></a>
                <span>Nhận xét này hữu ích với bạn?</span>
                <button type="button" class="btn btn-success pt-1 pb-1 pl-2 pr-2">
                    <i class="far fa-thumbs-up mr-1"></i>Cảm ơn
                </button>
            </div>
        </div>
      </div>
  
      <hr />
      `);
  }
});
