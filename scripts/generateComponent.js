const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask user for component name
rl.question('Enter component name: ', (componentName) => {
  if (!componentName) {
    console.log('❌ Component name is required.');
    rl.close();
    return;
  }

  // Ask user whether it's a feature or shared component
  rl.question('Choose location (feature/shared): ', (location) => {
    if (!['feature', 'shared', 'layout'].includes(location)) {
      console.log('❌ Invalid choice. Please enter "feature" or "shared".');
      rl.close();
      return;
    }

    const componentDir = path.join(__dirname, `../src/components/${location}/${componentName}`);

    // Ensure directory exists
    if (fs.existsSync(componentDir)) {
      console.log(`❌ Component ${componentName} already exists.`);
      rl.close();
      return;
    }

    fs.mkdirSync(componentDir, { recursive: true });

    // Generate component files
    const componentTsx = `import React from 'react';

const ${componentName} = () => {
  return (
    <div>
      <h2>${componentName} Component</h2>
    </div>
  );
};

export default ${componentName};
`;

    const componentStyles = `/*Add styles for Test here*/
`;

    const componentIndex = `export { default } from './${componentName}';`;

    // Write files
    fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), componentTsx);
    fs.writeFileSync(path.join(componentDir, `${componentName}.module.css`), componentStyles);
    fs.writeFileSync(path.join(componentDir, `index.ts`), componentIndex);

    console.log(`✅ Component ${componentName} created in components/${location}/`);
    rl.close();
  });
});
