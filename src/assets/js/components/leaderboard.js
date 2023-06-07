$(document).ready(function () {
  /**
   * Function to change Leaderboard details when leaderboard card clicker
   * @date 4/17/2023 - 9:47:09 PM
   */
  function leaderboardSwitcher() {
    try {
      let section = $("section.leaderboard");
      let leaderboardCard = section.find(".leaderboard-list .leaderboard-card");
      let detailsCardWrapper = section.find(".leaderboard-details");
      let detailsCard = detailsCardWrapper.find(".mecha-card-v2");

      if (!leaderboardCard.length || !detailsCard.length) return;

      /**
       * Function to update the details card data
       * @date 4/18/2023 - 5:57:39 AM
       *
       * @param {string} number
       * @param {string} img
       * @param {string} name
       * @param {string} code
       * @param {array<{title:string,value:string}>} stats
       */
      function updateDetailsCard(number, img, name, code, stats) {
        let numberEl = detailsCard.find(".mecha-card-v2__number"),
          imgEl = detailsCard.find(".mecha-card-v2__image-wrapper img"),
          nameEl = detailsCard.find(".mecha-card-v2__name"),
          codeEl = detailsCard.find(".mecha-card-v2__code"),
          statsEl = detailsCard.find(".mecha-card-v2__stats-wrapper");

        numberEl.text(number);
        imgEl.attr("src", img);
        nameEl.text(name);
        codeEl.text(code);

        let statsHTML = "";
        stats.map((_, { title, value }) => {
          statsHTML += `<div class="mecha-card-v2__stat">
          <div class="mecha-card-v2__stat-title">${title}</div>
          <div class="mecha-card-v2__stat-value">${value}</div>
        </div>`;
        });

        statsEl.html(statsHTML);
        detailsCardWrapper.css("left", "");
        detailsCardWrapper.removeClass("show");
        detailsCardWrapper.addClass("show");
      }

      $(document).on(
        "click",
        ".leaderboard-details .mecha-card-v2 .btn-close",
        function () {
          leaderboardCard.removeClass("active");

          detailsCardWrapper.animate(
            {
              left: "100%",
            },
            300,
            function () {
              detailsCardWrapper.css("left", "");
              detailsCardWrapper.removeClass("show");
            }
          );
        }
      );

      $(document).on(
        "click",
        ".leaderboard-list .leaderboard-card",
        function () {
          let card = $(this),
            number = card.find(".leaderboard-card__number").text(),
            img = card.find(".leaderboard-card__image-wrapper img").attr("src"),
            name = card.find(".leaderboard-card__name").text(),
            code = card.find(".leaderboard-card__code").text(),
            stats = card
              .find(".leaderboard-card__stats-wrapper")
              .children()
              .map((_, stat) => ({
                title: $(stat).find(".leaderboard-card__stat-title").text(),
                value: $(stat).find(".leaderboard-card__stat-value").text(),
              }));

          card.siblings(".leaderboard-card").removeClass("active");
          card.addClass("active");

          updateDetailsCard(number, img, name, code, stats);
        }
      );

      if ($(window).width() >= 992) leaderboardCard.eq(0).trigger("click");

      $(window).on("resize", function () {
        if ($(window).width() >= 992) {
          leaderboardCard.eq(0).trigger("click");
        } else {
          leaderboardCard.removeClass("active");
        }

        if (detailsCardWrapper.hasClass("show")) {
          if ($(window).width() >= 992) {
            detailsCardWrapper.removeClass("show");
          }
        }
      });
    } catch (error) {
      console.error("leaderboard switcher error", error);
    }
  }

  /**
   * Call and initialize all functions
   *
   * @date 4/17/2023 - 9:45:53 PM
   */
  function init() {
    leaderboardSwitcher();
  }

  init();
});
