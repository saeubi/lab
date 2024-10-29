const loadItems = (requireContext: __WebpackModuleApi.RequireContext) => {
    return requireContext.keys().map((fileName) => {
        const item = requireContext(fileName).default;
        return {
            name: fileName.replace('./', '').replace('.tsx', ''),
            item: item,
        };
    });
};

export default loadItems;