module.exports = {
  '*.ts': ['yarn lint --fix', 'yarn format'],
  '*.tsx': ['yarn lint --fix', 'yarn format'],
  '*.js': ['yarn lint --fix', 'yarn format'],
  '*.jsx': ['yarn lint --fix', 'yarn format'],
  '*.json': ['yarn lint --fix', 'yarn format'],
};
