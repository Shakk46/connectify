export function adjustHeight(e) {
    let block = e.target
    block.style.height = "auto";
    block.style.height = block.scrollHeight + "px";
}