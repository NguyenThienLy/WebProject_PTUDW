$(document).ready(function() {
  var star = 1;

  // Kiểm tra đã đăng nhập chưa tab
  $(document).on(
    "click",
    "#nav-product-detail-comment #btnShowPostCommentProductDetail",
    function() {
      $.post("/customer/auth/check-is-login", function(data) {
        if (data === "true") {
          // $(document).on(
          //   "click",
          //   "#nav-product-detail-comment #product-detail-nav-post-comment-collapse #btnPostCommentProductDetail",
          //   function() {
          //     var $idProductDetail = $(this).attr("id-product-detail");
          //     var $id = $(this).attr("id-product");
          //     var isSimple = $(this).attr("is-simple") === "true";
          //     var title = $(
          //       "#nav-product-detail-comment #product-detail-nav-post-comment-collapse #product-detail-nav-collapse-show-rate-comment-title"
          //     ).val();
          //     var content = $(
          //       "#nav-product-detail-comment #product-detail-nav-post-comment-collapse #product-detail-nav-collapse-show-rate-comment-content"
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
          //           clearOldContentTab();
          //           emptyContainCommentTab();
          //           updateQuantityCommentTab();
          //           showCommentInProductTab(JSON.parse(data));

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
              var $id = $(
                "#nav-product-detail-comment #product-detail-nav-post-comment-collapse #btnPostCommentProductDetail"
              ).attr("id-product");
              // alert($id);
              var isSimple =
                $(
                  "#nav-product-detail-comment #product-detail-nav-post-comment-collapse #btnPostCommentProductDetail"
                ).attr("is-simple") === "true";
                // alert(isSimple);
              var title = $(
                "#nav-product-detail-comment #product-detail-nav-post-comment-collapse #product-detail-nav-collapse-show-rate-comment-title"
              ).val();
              // alert(title);
              var content = $(
                "#nav-product-detail-comment #product-detail-nav-post-comment-collapse #product-detail-nav-collapse-show-rate-comment-content"
              ).val();
              // alert(content);
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
                    // alert(data.quantityComment);
                    // alert(data.rate);
                    // comment
                    clearOldContentTab();
                    emptyContainCommentTab();
                    updateQuantityCommentTab(+data.quantityComment);
                    updateRateProductDetailTab(+data.rate);
                    showCommentInProductTab(JSON.parse(data.comments));

                    clearOldContentHeading();
                    emptyContainCommentHeading();
                    updateQuantityCommentHeading(+data.quantityComment);
                    updateRateProductDetailHeading(+data.rate);
                    showCommentInProductHeading(JSON.parse(data.comments));

                    // star percent
                    emptyContainStarsPerCentTab();
                    showStarsPercentProductTab(JSON.parse(data.percentsStar));

                    emptyContainStarsPerCentHeading();
                    showStarsPercentProductHeading(
                      JSON.parse(data.percentsStar)
                    );
                  }
                }
              );
            }
          });

          $(document).on(
            "click",
            "#nav-product-detail-comment #product-detail-nav-post-comment-collapse .rate > input",
            function() {
              star = $(this).attr("value");
            }
          );
        } else {
          // $("#nav-product-detail-comment > #product-detail-nav-post-comment-collapse").removeClass("show");

          // $("#nav-product-detail-comment > #product-detail-nav-post-comment-collapse").removeClass("show");

          $(
            "#nav-product-detail-comment > #product-detail-nav-post-comment-collapse"
          ).on("shown.bs.collapse", function() {
            $(
              "#nav-product-detail-comment > #product-detail-nav-post-comment-collapse"
            ).removeClass("show");
          });

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

  // Kiểm tra đã đăng nhập chưa heading
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

          //           clearOldContentTab();
          //           emptyContainCommentTab();
          //           updateQuantityCommentTab();
          //           showCommentInProductTab(JSON.parse(data));
          //         }
          //       }
          //     );
          //   }
          // );

          $("#formHeadingProductDetail").validate({
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
              //var $idProductDetail = $(this).attr("id-product-detail");
              var $id = $(
                "#divContainAllAboutComment #product-detail-accordion-post-comment-collapse #btnPostCommentProductDetail"
              ).attr("id-product");
              var isSimple =
                $(
                  "#divContainAllAboutComment #product-detail-accordion-post-comment-collapse #btnPostCommentProductDetail"
                ).attr("is-simple") === "true";
              var title = $(
                "#divContainAllAboutComment #product-detail-accordion-post-comment-collapse #product-detail-nav-collapse-show-rate-comment-title"
              ).val();
              var content = $(
                "#divContainAllAboutComment #product-detail-accordion-post-comment-collapse #product-detail-nav-collapse-show-rate-comment-content"
              ).val();

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
                    // comment
                    clearOldContentTab();
                    emptyContainCommentTab();
                    updateQuantityCommentTab(+data.quantityComment);
                    updateRateProductDetailTab(+data.rate);
                    showCommentInProductTab(JSON.parse(data.comments));

                    clearOldContentHeading();
                    emptyContainCommentHeading();
                    updateQuantityCommentHeading(+data.quantityComment);
                    updateRateProductDetailHeading(+data.rate);
                    showCommentInProductHeading(JSON.parse(data.comments));

                    // star percent
                    emptyContainStarsPerCentTab();
                    showStarsPercentProductTab(JSON.parse(data.percentsStar));

                    emptyContainStarsPerCentHeading();
                    showStarsPercentProductHeading(
                      JSON.parse(data.percentsStar)
                    );
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

          $(
            "#divContainAllAboutComment > #product-detail-accordion-post-comment-collapse"
          ).on("shown.bs.collapse", function() {
            $(
              "#divContainAllAboutComment > #product-detail-accordion-post-comment-collapse"
            ).removeClass("show");
          });

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

  function clearOldContentTab() {
    $(
      "#nav-product-detail-comment #product-detail-nav-post-comment-collapse #product-detail-nav-collapse-show-rate-comment-title"
    ).val("");
    $(
      "#nav-product-detail-comment #product-detail-nav-post-comment-collapse #product-detail-nav-collapse-show-rate-comment-content"
    ).val("");

    $(
      "#nav-product-detail-comment #product-detail-nav-post-comment-collapse .rate > input"
    ).prop("checked", false);
    $(
      `#nav-product-detail-comment #product-detail-nav-post-comment-collapse .rate > input[id="inputRate1"]`
    ).prop("checked", true);

    $(
      "#nav-product-detail-comment > #product-detail-nav-post-comment-collapse"
    ).removeClass("show");
  }

  function emptyContainCommentTab() {
    $("#nav-product-detail-comment #divContainCommentsProductDetail").empty();
  }

  function emptyContainStarsPerCentTab() {
    $(
      "#nav-product-detail-comment #divContainStarsPercentProductDetail"
    ).empty();
  }

  function updateQuantityCommentTab(quantityComment) {
    $("#nav-product-detail-comment #strongQuantityCommentProductDetail").text(
      quantityComment
    );
  }

  function updateRateProductDetailTab(rate) {
    $("#nav-product-detail-comment #spanRateProductDetail").text(rate);
  }

  function showCommentInProductTab(data) {
    var i;
    for (i = 0; i < data.length; i++) {
      var strStartComment = addStarCommentTab(data[i].rateStar);
      var strStartCommentUncheck = addStarCommentUncheckTab(
        data[i].rateStarUncheck
      );
      var verifyProduct = addVerifyTab(data[i].VERIFYCATION);

      appendCommentInProductDetailTab(
        data[i],
        strStartComment,
        strStartCommentUncheck,
        verifyProduct
      );
    }
  }

  function showStarsPercentProductTab(data) {
    var i;
    for (i = 0; i < data.length; i++) {
      appendStarsPercentInProductDetailTab(data[i]);
    }
  }

  function addStarCommentTab(startComments) {
    var strStartComment = "";
    for (var i = 0; i < startComments.length; i++)
      strStartComment += ` <span class="fa fa-star checked"></span>`;

    return strStartComment;
  }

  function addStarCommentUncheckTab(startCommentsUncheck) {
    var strStartCommentUncheck = "";
    for (var i = 0; i < startCommentsUncheck.length; i++)
      strStartCommentUncheck += ` <span class="fa fa-star"></span>`;

    return strStartCommentUncheck;
  }

  function addVerifyTab(isVerify) {
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

  function appendCommentInProductDetailTab(
    comment,
    strStartComment,
    strStartCommentUncheck,
    verifyProduct
  ) {
    $("#nav-product-detail-comment #divContainCommentsProductDetail").append(`
      <div class="component-comment row ml-0 mr-0 mt-3">
      <div class="content-left col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
          <div class="img-avatar">
              <img src="${comment.IMAGE}" class="w-100 rounded-circle" alt="" />
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

  function appendStarsPercentInProductDetailTab(starsPercent) {
    $(
      "#nav-product-detail-comment #divContainStarsPercentProductDetail"
    ).append(`
    <div class="star-percent d-flex align-items-center">
    <div class="mr-2">${
      starsPercent.STARS
    } <i class="ml-1 fas fa-star"></i></div>
    <div class="progress mr-2">
        <div class="progress-bar-1 progress-bar bg-success" style="width: ${
          starsPercent.percent
        }%" role="progressbar" aria-valuenow="${starsPercent.percent}"
            aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="percent">${starsPercent.percent}%</div>
    </div>
  `);
  }

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

  function emptyContainStarsPerCentHeading() {
    $(
      "#divContainAllAboutComment #divContainStarsPercentProductDetail"
    ).empty();
  }

  function updateQuantityCommentHeading(quantityComment) {
    $("#divContainAllAboutComment #strongQuantityCommentProductDetail").text(
      quantityComment
    );
  }

  function updateRateProductDetailHeading(rate) {
    $("#divContainAllAboutComment #spanRateProductDetail").text(rate);
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

  function showStarsPercentProductHeading(data) {
    var i;
    for (i = 0; i < data.length; i++) {
      appendStarsPercentInProductDetailHeading(data[i]);
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

  function appendStarsPercentInProductDetailHeading(starsPercent) {
    $(
      "#divContainAllAboutComment #divContainStarsPercentProductDetail"
    ).append(`
    <div class="star-percent d-flex align-items-center">
    <div class="mr-2">${
      starsPercent.STARS
    } <i class="ml-1 fas fa-star"></i></div>
    <div class="progress mr-2">
        <div class="progress-bar-1 progress-bar bg-success" style="width: ${
          starsPercent.percent
        }%" role="progressbar" aria-valuenow="${starsPercent.percent}"
            aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="percent">${starsPercent.percent}%</div>
    </div>
  `);
  }
});
