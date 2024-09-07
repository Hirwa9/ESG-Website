
// Songs lists Displaying

// ************************** An array containing all songs **************************
// const songsArray = [];
// ************************** An array containing all songs **************************

// page tips
let pageTips = [
    { tipElement: $(".galleryFilter-tools .galrFilterCls"), tipTitle: "Refresh images", tipMessage: "Use the refresh icon to refresh back all available images" },
    { tipElement: $(".galleryFilter-tools .galrFilterMerge"), tipTitle: "Merge tags", tipMessage: "Use the tool and merge different filter tags which allows to find related images" },
    { tipElement: $(".galleryFilter-tools .galrFilterMatch"), tipTitle: "All matches", tipMessage: "After merging tags, you can use \"All matches\" tool to enable displaying all possible matches from the combination" },
];
galleryTipsList = pageTips.concat([...webTipsList]);
allTipsNum = galleryTipsList.length;

$('.web-tips-toggler').click(function () {
    tipIndex = 0;
    show_web_tips(galleryTipsList, tipIndex);
});
function next_web_tips() {
    tipIndex = (tipIndex + 1) % allTipsNum;
    while (!visible(galleryTipsList[tipIndex].tipElement)) {
        tipIndex = (tipIndex + 1) % allTipsNum;
    }
    show_web_tips(galleryTipsList, tipIndex);
}