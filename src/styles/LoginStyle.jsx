export function LoginBox({ children }) {
  return (
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-7-tablet is-5-desktop is-6-widescreen">
              <form action="" class="box">
                {children}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function InputField({ label, children }) {
  return (
    <div class="field">
      <label for="" class="label">
        {label}
      </label>
      <div class="control has-icons-left">{children}</div>
    </div>
  );
}
